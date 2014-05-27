EatFriends.Views.Leaderboard = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		//this.leaders = options.leaders;
	},
	
	template: JST['leaderboards/show_leaderboard'],
	
	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this
	},
	
});