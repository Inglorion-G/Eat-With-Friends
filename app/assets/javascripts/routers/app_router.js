EatFriends.Routers.AppRouter = Backbone.Router.extend({
	
	routes: {
		"":"dashboard",
	},
	
	dashboard: function (id) {
		var user = EatFriends.Collections.users.getOrFetch(currentUserID);
		var userShowView = new EatFriends.Views.UserShow({
			model: user
		});
		
		this._swapView(userShowView);
	},
	
	usersIndex: function () {
		var usersIndexView = new EatFriends.Views.UsersIndex({
			collection: EatFriends.Collections.users
		})
		EatFriends.Collections.users.fetch();
		
		this._swapView(usersIndexView)
	},
	
	_swapView: function (newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		
		$("#content").html(newView.render().$el);
		this.currentView = newView;
	}
	
});