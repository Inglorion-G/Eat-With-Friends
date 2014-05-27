json.array! @friends do |friend|
  json.extract! friend, :id, :username, :daily_calories, :weekly_calories
end