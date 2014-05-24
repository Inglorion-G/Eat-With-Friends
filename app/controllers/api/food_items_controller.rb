class Api::FoodItemsController < Api::ApiController
  
  def index
    @food_items = FoodItem.with_query(params)
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
    #db_search_term = SearchTerm.where(term: search_term)
    term = SearchTerm.find_by(:term => search_term)
    
    # move all this to the model
    if term
      food_items_list = term.food_items
    else
      term = SearchTerm.create(:term => search_term)
      food_items_list = term.get_or_fetch_food_items
    end

    render json: food_items_list
  end
  
  private
  
  def food_params
    params.require(:food_item).permit(:calories, :item_name, :nx_id)
  end
  
end