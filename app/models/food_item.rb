class FoodItem < ActiveRecord::Base
  
  has_many :users, through: :user_food_items, source: :user
  belongs_to :search_term
end