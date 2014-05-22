class CreateFoodItems < ActiveRecord::Migration
  def change
    create_table :food_items do |t|
      t.float :calories
      t.string :item_name
      t.string :nx_id

      t.timestamps
    end
    add_index :food_items, :nx_id, unique: true
  end
end
