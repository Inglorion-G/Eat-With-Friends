EatFriends.Routers.AppRouter = Backbone.Router.extend({
	
	routes: {
		"":"dashboard",
		"food_items/index":"searchFoods",
		"users/index":"addFriends",
		"users/leaderboard":"leaderBoard"
	},
	
	dashboard: function (id) {
		var user = EatFriends.Collections.users.getOrFetch(currentUserID);
		var userShowView = new EatFriends.Views.UserShow({
			model: user
		});
		
		EatFriends.Collections.food_items.fetch();
		this._swapView(userShowView);
	},
	
	addFriends: function () {
		var usersIndexView = new EatFriends.Views.UsersIndex({
			collection: EatFriends.Collections.users
		})
		
		EatFriends.Collections.users.fetch();
		//EatFriends.Collections.food_items.fetch();
		
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
		var user = EatFriends.Collections.users.getOrFetch(currentUserID);
		var leaderboardView = new EatFriends.Views.UsersLeaderBoard({
			model: user,
			collection: user.friends()
		})
		
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