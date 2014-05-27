window.EatFriends.Views.FriendShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.alreadyFriend = options.alreadyFriend
	},
	
	template: JST["users/friends/show_friend"],
	
	events: {
		"click .add-friend-button":"addFriend"
	},
	
	render: function () {
		var content = this.template({
			friend: this.model,
			alreadyFriend: this.alreadyFriend
		});
		
		this.$el.html(content);
		return this;
	},
	
	addFriend: function(event) {
		event.preventDefault();
		var newFriendship = new EatFriends.Models.Friendship({
			friend_id: this.model.id,
		})
		newFriendship.save();
		this.render();
	}
	
});
