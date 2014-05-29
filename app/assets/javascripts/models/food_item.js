window.EatFriends.Models.FoodItem = Backbone.Model.extend({
	urlRoot: 'api/food_items',
	
	initialize: function (options) {
		this.item_name = options.item_name;
		this.calories = options.calories;
	},
})