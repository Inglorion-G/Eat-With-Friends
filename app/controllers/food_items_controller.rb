require 'addressable/uri'

class NXsession
  
  nx_app_id = ENV["nx_app_id"]
  nx_app_key = ENV["nx_app_key"]
  
  def self.get_food_items_from_nx(food_item)
    parse_json_from_uri(food_item_api_request(food_item))
  end
  
  def self.food_item_api_request(food_item)
    Addressable::URI.new(
      scheme: "https",
      host: "api.nutritionix.com",
      path: "v1_1/search/#{food_item}",
      query_values: {
        results: "0:20",
        fields: "brand_name,item_name,item_id,nf_calories",
        appId: nx_app_id,
        appKey: nx_app_key
      }
    )
  end
  
  def self.parse_json_from_uri(uri)
    JSON.parse(RestClient.get(uri.to_s))
  end
  
end

class FoodItemsController < ApplicationController
  
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
  
  def search_food()
    search_term = params[:search_term]
    json = NXsession.get_food_items_from_nx(search_term)
    render json: json
  end
  
  private
  
  def food_params
    params.require(:food_item).permit(:calories, :item_name, :nx_id)
  end
  
end