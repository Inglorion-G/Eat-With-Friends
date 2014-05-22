class FoodItem < ActiveRecord::Base
  #  loop through the JSON object and create models, return an array of models
  def self.food_items_from_json(json)
    food_items = []
    
    json["hits"].each do |food_item|
      params = food_item["fields"]
      new_food_item = FoodItem.new()
      
      new_food_item.calories = params["nf_calories"]
      new_food_item.item_name = params["item_name"]
      new_food_item.nx_id = params["item_id"]
      food_items << new_food_item
    end
    
    food_items
    # new_food_item.each do |food_item| 
#       if FoodItem.find_by_nx_id(new_food_item.nx_id)
#     end
  end
end