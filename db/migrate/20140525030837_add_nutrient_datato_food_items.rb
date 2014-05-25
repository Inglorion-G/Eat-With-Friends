class AddNutrientDatatoFoodItems < ActiveRecord::Migration
  def change
    change_table :food_items do |t|
      t.float :total_fat
      t.float :total_carbs
      t.float :total_protein
    end
  end
end
