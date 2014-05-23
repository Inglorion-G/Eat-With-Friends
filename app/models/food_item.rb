class FoodItem < ActiveRecord::Base
  
  has_many :users, through: :user_food_items, source: :user
  
  def self.is_persisted?(search_term)
    SearchTerm.exists?(term: search_term)
  end
  
  def self.get_or_fetch(search_term)
    if self.is_persisted?(search_term)
      search_term_id = SearchTerm.find_by(term: search_term).id
      json = FoodItem.where(search_term_id: search_term_id).to_json
    else
      term = SearchTerm.new(term: search_term)
      term.save
      json = NXSession.get_food_items_from_nx(search_term)
      self.save_food_items(json, term.id)
    end
    json
  end
  
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
  end
  
  def self.save_food_items(food_items_json, search_term_id)
    food_items = self.food_items_from_json(food_items_json)
    food_items.each do |item| 
      item.search_term_id = search_term_id
      item.save
    end
  end
  
end