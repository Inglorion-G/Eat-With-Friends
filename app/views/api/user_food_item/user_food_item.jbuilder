json.extract! user_food_item, :user_id, :food_item_id, :created_at, :updated_at, :get_calories

json.food_item user_food_item.food_item, :id, :item_name, :nx_id, :calories, :created_at, :updated_at