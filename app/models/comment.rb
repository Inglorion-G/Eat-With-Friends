class Comment < ActiveRecord::Base
  validates :body, null: false
  
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :commentable, polymorphic: true
end
