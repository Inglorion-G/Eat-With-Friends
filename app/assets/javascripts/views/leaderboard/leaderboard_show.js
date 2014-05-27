EatFriends.Views.Leaderboard = Backbone.CompositeView.extend({
	
	initialize: function() {
		var that = this;
		//var timeframe = options.timeframe;
		this.collection = new EatFriends.Collections.Users();
		this.collection.url = "/api/leaderboards";
		this.collection.comparator = this.sortByDaily;
		// if (timeframe === "daily") {
// 			this.collection.comparator = this.sortByDaily;
// 		} else {
// 			this.collection.comparator = this.sortByWeekly;
// 		}
		
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
	
	sortByDaily: function (leader1, leader2) {
	  return( leader1.get('daily_calories') < leader2.get('daily_calories'))
	},
	
	sortByWeekly: function (leader1, leader2) {
		return( leader1.get('weekly_calories') < leader2.get('weekly_calories'))
	},
	
	addLeader: function(leader) {
		var leaderShowView = new EatFriends.Views.LeaderShow({
			model: leader
		})
		
		this.addSubview(".leaderboard-panel-body", leaderShowView)
		leaderShowView.render()
	},
	
});