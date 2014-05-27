class Api::LeaderboardsController < Api::ApiController
  
  def index
    @friends = current_user.friends.to_a
    render "api/leaderboards/leaderboard"
  end
  
end