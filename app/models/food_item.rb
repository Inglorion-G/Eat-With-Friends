class FoodItem < ActiveRecord::Base
  
  has_many :users, through: :user_food_items, source: :user
  belongs_to :search_term
  
  def self.with_query(query_params = {})
    if search_term = query_params[:search_term]
      term = SearchTerm.find_by(:term => search_term)
      if term
        food_items_list = term.food_items
      else
        term = SearchTerm.create(:term => search_term)
        food_items_list = term.get_or_fetch_food_items
      end
      return food_items_list
    end
    
    if query_params[:food_item_ids]
      return self.where('food_items.id IN (?)', query_params[:food_item_ids].split(','))
    end
    
    self.all
  end
end