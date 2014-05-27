EatFriends.Models.Leaderboard = Backbone.Model.extend({
	urlRoot: "/api/leaderboards",
	
	parse: function(payload) {
		if (payload.leaderboard) {
			this.leaders().set(payload.leaderboard, { parse: true });
			delete payload.leaderboard;
		}
	}
	
});