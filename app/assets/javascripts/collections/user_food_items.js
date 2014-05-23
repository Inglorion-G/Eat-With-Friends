window.EatFriends.Collections.UserFoodItems = Backbone.Collection.extend({
	
	model: EatFriends.Models.UserFoodItem,
	
	url: function () {
		return this.user.url() + "/user_food_items"
	},
	
	initialize: function (models, options) {
		this.user = options.user;
	}
	
});