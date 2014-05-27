EatFriends.Views.Leaderboard = Backbone.CompositeView.extend({
	
	initialize: function() {
		var that = this;
		this.collection = new EatFriends.Collections.Users();
		this.collection.url = "/api/leaderboards";
		this.collection.comparator = this.comparator;
		this.collection.fetch({
			success: function() {
				that.collection.each(that.addLeader.bind(that));
			}
		});

		this.listenTo(this.collection, "sync", this.render);
	},
	
	template: JST['leaderboards/show_leaderboard'],
	
	render: function () {
		var content = this.template({
			leaders: this.collection
		});
		this.$el.html(content);
		this.attachSubviews();
		
		return this;
	},
	
	comparator: function (leader1, leader2) {
		return( leader1.get('daily_calories') < leader2.get('daily_calories'))
	},
	
	addLeader: function(leader) {
		debugger
		var leaderShowView = new EatFriends.Views.LeaderShow({
			model: leader
		})
		
		this.addSubview(".leaderboard-panel-body", leaderShowView)
		leaderShowView.render()
	},
	
});