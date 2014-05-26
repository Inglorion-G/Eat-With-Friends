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
		var searchResultsView = new EatFriends.Views.FoodSearch({
			collection: foods
		});
		
		this.addSubview(".food-search-results", searchResultsView);
		searchResultsView.render();
	}
});

// handleFoodSearchResults: function (foods) {
// 	var that = this;
// 	$("#food-search-results").html("")
// 	_.each(foods, function (food) {
// 		var foodShowView = new EatFriends.Views.FoodItemShow({
// 			model: food
// 	  })
// 		that.addSubview("#food-search-results", foodShowView);
// 		foodShowView.render()
// 	})
// },

// foodSearchRequest: function (event) {
// 	event.preventDefault();
// 	var searchTerm = $("#food-search-term").val().toLowerCase();
// 	var that = this;
// 	this.collection.fetch({ 
// 		data: { search_term: searchTerm },
// 		success: function () {
// 			var foods = that.collection.models
// 			console.log(foods)
// 			that.handleFoodSearchResults(foods)
// 		}
// 	})
// },