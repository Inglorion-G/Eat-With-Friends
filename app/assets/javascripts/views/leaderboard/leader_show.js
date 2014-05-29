window.EatFriends.Views.LeaderShow = Backbone.CompositeView.extend({
	
	events: {
		"click .view-profile": "showUserProfile"
	},
	
	template: JST["leaderboards/leaders/daily_show"],
	
	showUserProfile: function(event) {
		event.preventDefault();
		Backbone.history.navigate("/users/" + this.model.get('id'), {trigger: true})
	},
	
	render: function () {
		var content = this.template({
			leader: this.model,
			gravatarLink: "https://secure.gravatar.com/avatar/" + this.model.get('email_hash')
		});
		
		this.$el.html(content);
		return this;
	},
});