EatFriends.Views.LeaderBoard = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.leaders = options.leaders;
	},
	
	template: JST['leaderboards/leaderboard'],
	
	render: function () {
		var content = this.template({
			user: this.model,
			leaders: this.leaders
		});
		this.$el.html(content);
		return this
	},
	
});