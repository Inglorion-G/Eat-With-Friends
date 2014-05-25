class Api::FriendshipController < Api::ApiController
  
  def index
    @friendships = Friendship.all
    render json: @friendships
  end
  
  def show
    @friendship = Friendship.find(params[:id])
    render json: @friendship
  end
  
  def newFriendship
    @friendship = Friendship.new
  end
  
  def create
    @friendship = Friendship.new(friendship_params)
    @friendship.user_id = current_user.id
    
    if @friendship.save
      redirect_to :back
    else
      flash.now[:errors] = @friendship.errors.full_messages
      render :new, status: 422
    end
  end
  
  def destroy
    Friendship.find(params[:id]).try(:destroy)
    render json: nil
  end
  
  private
  
  def friendship_params
    params.require(:friendship).permit(:friend_id, :user_id)
  end
  
end