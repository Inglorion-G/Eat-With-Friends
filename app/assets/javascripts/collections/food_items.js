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
			model = new EatFriends.Models.User( {id: id} );
			model.fetch({
				success: function () { users.add(model) }
			});
			return model;
		}
	},
});