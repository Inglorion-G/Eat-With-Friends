class Api::UserFoodItemsController < ApplicationController
  
  def index
    @user_food_items = UserFoodItem.all
    render json: @user_food_items
  end
  
  def show
    @user_food_item = UserFoodItem.find(params[:id])
    render json: @user_food_item
  end
  
  def new
    @user_food_item = UserFoodItem.new
  end
  
  def create
    @user_food_item = UserFoodItem.new(food_params)
    @user_food_item.user_id = current_user.id
    
    if @user_food_item.save
      redirect_to :back
    else
      flash.now[:errors] = @user_food_item.errors.full_messages
      render :new, status: 422
    end
  end
  
  def destroy
    UserFoodItem.find(params[:id]).try(:destroy)
    render json: nil
  end
  
  private
  
  def food_params
    params.require(:user_food_item).permit(:food_item_id, :consumption_time)
  end
  
end