class Api::LeaderboardsController < Api::ApiController
  
  def index
    @friends = current_user.friends.to_a
    @friends << current_user
    render "api/leaderboards/leaderboard"
  end
  
end