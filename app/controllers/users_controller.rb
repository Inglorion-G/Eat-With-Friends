class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def index
    @users = User.all
    render json: @users
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      login(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new, status: 422
    end
  end
  
  def show
    # use include to grab all the user food items 
    @user = current_user
    render partial: "api/users/user", locals: { user: @user}
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
