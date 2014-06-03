class Api::UsersController < Api::ApiController
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    render partial: "api/users/user", locals: { user: @user}
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
