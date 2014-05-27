class Api::LeaderboardsController < Api::ApiController
  
  def index
    render "api/leaderboards/leaderboard"
  end
  
end