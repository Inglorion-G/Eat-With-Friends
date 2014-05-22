window.Trellino.Collections.Meals = Backbone.Collection.extend({
	model: Trellino.Models.Meal,
	url: "api/meals",
	
	getOrFetch: function (id) {
		var model;
		var meals = this;
		
		if (model = this.get(id)) {
			model.fetch();
			return model;
		} else {
			model = new Trellino.Models.Meal( {id: id} );
			model.fetch({
				success: function () { meals.add(model) }
			});
			return model;
		}
	},
	
});