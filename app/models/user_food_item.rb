class UserFoodItem < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :food_item
  
end