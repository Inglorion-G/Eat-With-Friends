class Api::FoodItemsController < ApplicationController
  
  def index
    @food_items = FoodItem.all
    render json: @food_items
  end
  
  def show
    @food_item = FoodItem.find(params[:id])
    render json: @food_item
  end
  
  def new
    @food_item = FoodItem.new
  end
  
  def create
    @food_item = FoodItem.new(food_params)
    
    if @food_item.save
      redirect_to :back
    else
      flash.now[:errors] = @food_item.errors.full_messages
      render :new, status: 422
    end
  end
  
  def search_food
    search_term = params[:search_term]
    json = FoodItem.get_or_fetch(search_term)
    render json: json
  end
  
  private
  
  def food_params
    params.require(:food_item).permit(:calories, :item_name, :nx_id)
  end
  
end