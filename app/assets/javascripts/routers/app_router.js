EatFriends.Routers.AppRouter = Backbone.Router.extend({
	
	routes: {
		"":"mealsIndex",
	},
	
	mealsIndex: function () {
		var indexView = new Trellino.Views.MealsIndex({
			collection: Trellino.Collections.meals
		});
		Trellino.Collections.meals.fetch();
		
		this._swapView(indexView);
	},
	
	_swapView: function (newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		
		$("#content").html(newView.render().$el);
		this.currentView = newView;
	}
	
});