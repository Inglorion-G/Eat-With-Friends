class CreateUserFoodItems < ActiveRecord::Migration
  def change
    create_table :user_food_items do |t|
      t.integer :food_item_id, null: false
      t.integer :user_id, null: false
      t.datetime :consumption_time
      
      t.timestamps
    end
    add_index :user_food_items, :user_id
    add_index :user_food_items, :food_item_id
  end
end
