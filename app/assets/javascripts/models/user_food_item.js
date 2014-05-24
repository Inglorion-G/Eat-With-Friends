window.EatFriends.Models.UserFoodItem = Backbone.Model.extend({
	
	urlRoot: "/api/user_food_items",
	
	initialize: function(options) {
		this.user = options.user
	},
	
	foodItem: function(){
	  return EatFriends.Collections.food_items.getOrFetch(this.get('food_item_id'));
	}
})