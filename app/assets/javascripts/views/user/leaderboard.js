EatFriends.Views.UsersLeaderBoard = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.collection = options.collection;
	},
	
	template: JST['users/friends/leaderboard'],
	
	render: function () {
		var content = this.template({
			user: this.model,
			users: this.collection
		});
		this.$el.html(content);
		return this
	},
	
});