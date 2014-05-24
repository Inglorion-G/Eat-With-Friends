class Api::UsersController < Api::ApiController
  
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = current_user
    render partial: "api/users/user", locals: { user: @user}
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
