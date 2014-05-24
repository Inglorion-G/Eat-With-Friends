json.extract! user, :id, :username, :email, :created_at, :updated_at

# json.user_food_items user.user_food_items, :id, :user_id, :food_item_id, :created_at
json.user_food_items user.user_food_items do |user_food_item|
  json.(user_food_item, :id, :user_id, :food_item_id, :created_at)
  json.food_item user_food_item.food_item
end