class Friendship < ActiveRecord::Base
  
  validates :user_id, presence: true
  validates :friend_id, presence: true
  
  belongs_to :user
  belongs_to :friend, class_name: "User", foreign_key: :friend_id, primary_key: :id
  
end
