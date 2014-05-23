window.EatFriends.Collections.FoodItems = Backbone.Collection.extend({
	model: EatFriends.Models.FoodItem,
	
	url: "api/food_items",
	
	getOrFetch: function (id) {
		var model;
		var users = this;
		
		if (model = this.get(id)) {
			model.fetch();
			return model;
		} else {
			model = new EatFriends.Models.FoodItem( {id: id} );
			model.fetch({
				success: function () { food_items.add(model) }
			});
			return model;
		}
	},
});