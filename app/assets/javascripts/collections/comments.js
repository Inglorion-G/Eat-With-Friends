window.EatFriends.Collections.Comments = Backbone.Collection.extend({
	model: EatFriends.Models.Comment,
	
	url: "api/comments",
	
	getOrFetch: function (id) {
		var model;
		var comments = this;
		
		if (model = this.get(id)) {
			return model;
		} else {
			model = new EatFriends.Models.Comment( {id: id} );
			model.fetch({
				success: function () { comments.add(model) }
			});
			return model;
		}
	},
});