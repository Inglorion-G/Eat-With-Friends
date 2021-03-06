json.extract! @comment, :id, :author_id, :body, :created_at, 
  :updated_at, :commentable_id, :commentable_type

json.user_food_items user.user_food_items do |user_food_item|
  json.(user_food_item, :id, :user_id, :food_item_id, :created_at)
  json.food_item user_food_item.food_item
end

json.friendships user.friendships do |friendship|
  json.(friendship, :user_id, :friend_id)
  json.friend friendship.friend
end