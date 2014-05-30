EatFriends.Routers.AppRouter = Backbone.Router.extend({
	
	routes: {
		"":"dashboard",
		"users/index":"addFriends",
		"users/leaderboard":"leaderBoard",
		"users/:id": "showUserProfile",
		"food_items/index":"searchFoods",
	},
	
	dashboard: function (id) {
		var user = EatFriends.Collections.users.getOrFetch(currentUserID);
		var that = this;
		user.fetch({
			success: function (response) {
				var userShowView = new EatFriends.Views.UserShow({
					model: user
				});
				//EatFriends.Collections.food_items.fetch();
				that._swapView(userShowView);
			}
		});
	},
	
	showUserProfile: function(id) {
		var user = EatFriends.Collections.users.getOrFetch(id);
		user.fetch()
		var userShowView = new EatFriends.Views.UserShow({
			model: user
		});
		
		this._swapView(userShowView);
	},
	
	addFriends: function () {
		var user = EatFriends.Collections.users.getOrFetch(currentUserID);
		var usersIndexView = new EatFriends.Views.UsersIndex({
			model: user,
			collection: EatFriends.Collections.users
		});
		EatFriends.Collections.users.fetch();
		this._swapView(usersIndexView);
	},
	
	searchFoods: function () {
		var foodItemsIndexView = new EatFriends.Views.FoodItemsIndex({
			collection: new EatFriends.Collections.FoodItems()
		})
		EatFriends.Collections.food_items.fetch();
		
		this._swapView(foodItemsIndexView);
	},
	
	leaderBoard: function() {
		//var user = EatFriends.Collections.users.getOrFetch(currentUserID);
		//var leaderboard = new EatFriends.Views.Leaderboard();
		var leaderboardView = new EatFriends.Views.Leaderboard();
		
		this._swapView(leaderboardView);
	},
	
	_swapView: function (newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		
		$("#content").html(newView.render().$el);
		this.currentView = newView;
	}
	
});