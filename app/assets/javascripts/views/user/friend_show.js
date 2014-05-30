window.EatFriends.Views.FriendShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		// this.listenTo(this.model, "sync", this.render)
		this.listenTo(currentUser().friendships(), "add remove", this.render)
	},
	
	template: JST["users/friends/show_friend"],
	
	events: {
		"click .add-friend-button":"addFriend",
		"click .remove-friend":"removeFriend"
	},
	removeFriend: function(event){
		event.preventDefault();
		var friendship = currentUser().alreadyFriend(this.model);
		if(friendship){
			friendship.destroy();
		}
	},
	
	render: function () {
		var content = this.template({
			friend: this.model,
			alreadyFriend: currentUser().alreadyFriend(this.model)
		});
		
		this.$el.html(content);
		return this;
	},
	
	addFriend: function(event) {
		event.preventDefault();
		var that = this;
		var newFriendship = new EatFriends.Models.Friendship({
			friend_id: this.model.id,
		})
		newFriendship.save({}, {
			success: function(response) {
				currentUser().friendships().add(newFriendship)
				var message = new EatFriends.Views.NotificationView({
					type: 'success',
					text: "Added a new friend. Beautiful.",
				})
			}
		});
	}
	
});