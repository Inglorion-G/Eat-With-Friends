EatFriends.Views.FoodSearch = Backbone.CompositeView.extend({
	template: JST['food_items/search_results'],
	
	initialize: function (options) {
		this.collection = options.collection
		this.addFoodSubviews();
	},
	
	render: function () {
		var content = this.template({
			foods: this.collection
		});
		this.$el.html(content);
		this.attachSubviews();
		
		return this
	},
	
	addFoodSubviews: function () {
		var that = this;
		this.collection.each( function(food) {
			var foodShowView = new EatFriends.Views.FoodItemShow({
				model: food
			})
			that.addSubview("#food-search-panel", foodShowView);
		})	
	}
});