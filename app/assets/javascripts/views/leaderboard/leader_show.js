window.EatFriends.Views.LeaderShow = Backbone.CompositeView.extend({
	
	// initialize: function(options) {
// 		this.user = options.user
// 		this.listenTo(this.user.friendships(), "add sync", this.render)
// 	},
	
	events: {
		"click .view-profile": "showUserProfile"
	},
	
	template: JST["leaderboards/leaders/show"],
	
	showUserProfile: function(event) {
		event.preventDefault();
		Backbone.history.navigate("/users/" + this.model.get('id'), {trigger: true})
	},
	
	render: function () {
		debugger
		var content = this.template({
			leader: this.model
		});
		
		this.$el.html(content);
		return this;
	},
});