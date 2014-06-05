window.EatFriends.Views.FoodItemsIndex = Backbone.CompositeView.extend({
	template: JST["food_items/index"],
	
	initialize: function () {
		this.originalCollection = this.collection;
		this.foodSearchResults = new EatFriends.Collections.FoodItems();
	},
	
	render: function () {
		var content = this.template({
			collection: this.collection
		})
		
		this.$el.html(content);
		return this;
	},
	
	events: {
		"submit #search-foods":"foodSearchRequest",
		"keyup": "search"
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
	},
	
	responsiveFoodSearchResults: function() {
		$(".food-search-results").empty();	
		var responsiveResultsView = new EatFriends.Views.FoodSearch({
			collection: this.foodSearchResults
		});
		
		this.addSubview(".food-search-results", responsiveResultsView);
		responsiveResultsView.render();
	},
	
	search: function() {
		var string = $("#food-search-term").val().toLowerCase();
		if (string === "") {
			return this.foodSearchResults.reset();
		}
		
		var searchString = new RegExp("^" + string + ".*$", "i")
		var searchCollection = EatFriends.Collections.food_items.filter( function(model) {
			return searchString.test(model.get('item_name'))
		});
		
		this.foodSearchResults.set(searchCollection)
		this.responsiveFoodSearchResults()
	}
});