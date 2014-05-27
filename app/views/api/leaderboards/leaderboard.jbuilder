json.leaderboard current_user.friends do |friend|
  json.friend friend, :id, :username, :daily_calories, :weekly_calories
end