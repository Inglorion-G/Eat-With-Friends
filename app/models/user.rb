class User < ActiveRecord::Base
  attr_reader :password
  
  validates :username, :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  before_validation :ensure_session_token
  has_many :user_food_items
  has_many :food_items, through: :user_food_items, source: :food_item
  
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
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
  
  private
  
    def ensure_session_token
      self.session_token || self.class.generate_session_token
    end
end
