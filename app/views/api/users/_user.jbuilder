json.extract! user, :id, :username, :email, :created_at, :updated_at, :email_hash

# json.user_food_items user.user_food_items, :id, :user_id, :food_item_id, :created_at
json.user_food_items user.daily_user_food_items do |user_food_item|
  json.(user_food_item, :id, :user_id, :food_item_id, :created_at)
  json.food_item user_food_item.food_item
end

json.friendships user.friendships do |friendship|
  json.(friendship, :user_id, :friend_id, :id)
  json.friend friendship.friend, :id, :username, :email, :created_at, :updated_at, :email_hash
end

json.comments user.comments do |comment|
  json.(comment, :id, :body, :author_id)
end