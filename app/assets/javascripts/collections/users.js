window.EatFriends.Collections.Users = Backbone.Collection.extend({
	model: EatFriends.Models.User,
	url: "api/users",
	
	getOrFetch: function (id) {
		var model;
		var users = this;
		
		if (model = this.get(id)) {
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