class AddSearchIdToFoodItems < ActiveRecord::Migration
  def change
    change_table :food_items do |t|
      t.integer :search_term_id
    end
    add_index :food_items, :search_term_id
  end
end