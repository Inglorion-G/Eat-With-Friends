EatFriends.Routers.AppRouter = Backbone.Router.extend({
	
	routes: {
		"":"dashboard",
	},
	
	dashboard: function () {
		//user show view
	}
	
	_swapView: function (newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		
		$("#content").html(newView.render().$el);
		this.currentView = newView;
	}
	
});