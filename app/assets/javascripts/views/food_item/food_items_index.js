window.EatFriends.Views.FoodItemsIndex = Backbone.CompositeView.extend({
	template: JST["food_items/index"],
	
	render: function () {
		var content = this.template({
			collection: this.collection
		})
		
		this.$el.html(content);
		return this;
	},
	
	events: {
		"submit #search-foods":"foodSearchRequest"
	},
	
	foodSearchRequest: function (event) {
		event.preventDefault();
		var searchTerm = $("#food-search-term").val().toLowerCase();
		var that = this;
		this.collection.fetch({ 
			data: { search_term: searchTerm },
			success: function () {
				var foods = that.collection
				that.handleFoodSearchResults(foods)
			}
		})
	},
	
	handleFoodSearchResults: function(foods) {
		event.preventDefault();
		$(".food-search-results").empty();		
		var searchResultsView = new EatFriends.Views.FoodSearch({
			collection: foods
		});
		
		this.addSubview(".food-search-results", searchResultsView);
		searchResultsView.render();
	}
});