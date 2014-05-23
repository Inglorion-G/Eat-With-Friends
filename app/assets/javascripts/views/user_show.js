window.EatFriends.Views.UserShow = Backbone.CompositeView.extend({

	template: JST['users/show'],
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click #submit-food-search":"foodSearchRequest",
	},
	
	render: function () {
		var content = this.template({
			user: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
	foodSearchRequest: function (event) {
		event.preventDefault();
		var searchTerm = $("#food-search-term").val();
		var url = "food_items/search_food?search_term=" + searchTerm;
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