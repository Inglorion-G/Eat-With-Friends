require 'addressable/uri'

class NXSession
  def self.get_food_items_from_nx(search_term)
    parse_json_from_uri(food_item_api_request(search_term))
  end

  def self.food_item_api_request(food_item)
    nx_app_id = ENV["nx_app_id"]
    nx_app_key = ENV["nx_app_key"]
  
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