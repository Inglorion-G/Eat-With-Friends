class Api::LeaderboardsController < Api::ApiController
  
  def index
    @leaderboards = User.leader_boards
    render json: @leaderboards
  end
  
end