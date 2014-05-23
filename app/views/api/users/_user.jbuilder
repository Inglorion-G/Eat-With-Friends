json.extract! user, :id, :username, :email, :created_at, :updated_at

json.user_food_items user.user_food_items, :id, :user_id, :food_item_id, :created_at
# json.user_food_items user.user_food_items do |json, food_item|
  # json.(food_item, :id)
# end