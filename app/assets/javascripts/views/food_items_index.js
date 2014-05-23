window.EatFriends.Views.FoodItemsIndex = Backbone.View.extend({
	template: JST["food_items/index"],
	
	render: function () {
		var content = this.template({
			collection: this.collection
		})
		
		this.$el.html(content);
		return this;
	},
	
	events: {
		"click #submit-food-search":"foodSearchRequest"
	},
	
	foodSearchRequest: function (event) {
		event.preventDefault();
		var searchTerm = $("#food-search-term").val();
		var url = "food_items/search_food?search_term=" + searchTerm.toLowerCase();
		console.log(url)
		var that = this;
		$.ajax({
			type: "GET",
			url: url,
			success: function(response) {
				that.handleFoodSearchResults(response)
			}
		});
	},
	
	handleFoodSearchResults: function (foods) {
		_.each(foods, function (food) {
			$("#food-search-results")
			.append("<li>" + food.item_name + " -- Calories: " + food.calories + "</li>")
		});
	},
	
});