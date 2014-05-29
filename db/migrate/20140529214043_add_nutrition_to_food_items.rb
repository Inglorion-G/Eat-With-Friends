class AddNutritionToFoodItems < ActiveRecord::Migration
  def change
    change_table :food_items do |t|
      t.integer :search_term_id
      t.string :item_description
      t.string :ingredient_statement
      t.float :saturated_fat
      t.float :cholesterol
      t.float :sodium
      t.float :dietary_fiber
      t.float :vitamin_a
      t.float :vitamin_c
      t.float :calcium
      t.float :iron
      t.float :servings_per_container
      t.float :serving_size_qty
      t.string :serving_size_unit
      t.float :serving_weight_grams
    end
  end
end