class FoodItem < ActiveRecord::Base
  # class method food_items_from_json(json)
    #  loop through the JSON object and create models, return an array of models
  # end
  def self.food_items_from_json(json)
    new_food_item = FoodItem.new()
    
    json["hits"].each do |food_item_params|
      new_food_item.calories = food_item_params["nf_calories"]
      new_food_item.item_name = food_item_params["item_name"]
      new_food_item.nx_id = food_item_params["item_id"]
    end
    
    new_food_item.save! unless FoodItem.find_by_nx_id(new_food_item.nx_id)
  end
end