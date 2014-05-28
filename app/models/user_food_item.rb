class UserFoodItem < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :food_item
  
  def get_calories
    calories = self.food_item.calories
  end
  
end