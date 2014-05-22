# require 'addressable/uri'
# 
# class NXsession
#   
#   def self.get_food_items_from_nx(food_item)
#     parse_json_from_uri(food_item_api_request(food_item))
#   end
#   
#   def self.food_item_api_request(food_item)
#     Addressable::URI.new(
#       scheme: "https",
#       host: "api.nutritionix.com",
#       path: "v1_1/search/#{food_item}",
#       query_values: {
#         results: "0:20",
#         fields: "brand_name,item_name,item_id,nf_calories",
#         appId: "59b17",
#         appKey: "a609d2578271e407ede2737e7dfb6563"
#       }
#     )
#   end
#   
#   def self.parse_json_from_uri(uri)
#     JSON.parse(RestClient.get(uri.to_s))
#   end
#   
# end