class User < ActiveRecord::Base
  include Commentable
  attr_reader :password
  
  validates :username, :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  before_validation :ensure_session_token
  
  has_many :user_food_items
  has_many :food_items, through: :user_food_items, source: :food_item
  
  has_many :friendships
  has_many :friends, through: :friendships, source: :friend
  
  has_many :authored_comments, class_name: "Comment", foreign_key: :author_id
  
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end
  
  def email_hash
    Digest::MD5.hexdigest(self.email.downcase)
  end
  
  def password=(plain_text)
    if plain_text.present?
      @password = plain_text
      self.password_digest = BCrypt::Password.create(plain_text)
    end
  end
  
  def is_password?(plain_text)
    BCrypt::Password.new(self.password_digest).is_password?(plain_text)
  end
  
  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
  
  def daily_calories
    daily_cals = 0
    user_food_items = self.user_food_items
      .where(created_at: (DateTime.now.at_beginning_of_day.utc..Time.now.utc))
    
    user_food_items.each do |user_food_item|
      daily_cals += user_food_item.food_item.calories
    end
    
    daily_cals
  end
  
  def weekly_calories
    weekly_cals = 0
    user_food_items = self.user_food_items
      .where(created_at: (7.days.ago...Time.now.utc))
      
    user_food_items.each do |user_food_item|
      weekly_cals += user_food_item.food_item.calories
    end
    
    weekly_cals
  end
  
  private
  
    def ensure_session_token
      self.session_token || self.class.generate_session_token
    end
end
