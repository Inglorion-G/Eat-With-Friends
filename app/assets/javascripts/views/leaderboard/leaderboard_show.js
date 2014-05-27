EatFriends.Views.Leaderboard = Backbone.CompositeView.extend({
	
	initialize: function() {
		this.collection = new EatFriends.Collections.Users();
		this.collection.url = "/api/leaderboards";
		this.collection.comparator = this.comparator;
		this.collection.fetch();

		this.listenTo(this.collection, "sync", this.render)
	},
	
	template: JST['leaderboards/show_leaderboard'],
	
	render: function () {
		debugger
		var content = this.template({
			leaders: this.collection
		});
		this.$el.html(content);
		
		return this;
	},
	
	comparator: function (leader1, leader2) {
		return( leader1.get('daily_calories') < leader2.get('daily_calories'))
	},
	
});