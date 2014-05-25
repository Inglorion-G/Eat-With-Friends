class SearchTerm < ActiveRecord::Base
  validates :term, presence: true
  has_many :food_items
  
  def get_or_fetch_food_items
    items = self.food_items
    if items.empty?
      self.term = self.term.split(" ").join("+")
      food_item_data = NXSession.get_food_items_from_nx(self.term)
      self.food_items.build(food_item_data)
      self.save!
    end
    self.food_items
  end
end