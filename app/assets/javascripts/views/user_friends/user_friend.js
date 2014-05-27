window.EatFriends.Views.UserFriendShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.user = options.user
		this.listenTo(this.user.friendships(), "add sync", this.render)
	},
	
	events: {
		//"click .view-profile-button": "showUserProfile"
	},
	
	template: JST["user_friends/show"],
	
	showUserProfile: function(event) {
		event.preventDefault();
		Backbone.history.navigate("/users/" + this.model.get('friend_id'), {trigger: true})
	},
	
	render: function () {
		var content = this.template({
			friendship: this.model
		});
		
		this.$el.html(content);
		return this;
	},
});