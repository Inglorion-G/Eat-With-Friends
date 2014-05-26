window.EatFriends.Views.FriendShow = Backbone.CompositeView.extend({
	
	initialize: function() {
		//this.listenTo(EatFriends.Collections.food_items, "add", this.render)
	},
	
	template: JST["user/show_friend"],
	
	events: {
		"click .add-friend-button":"addFriend"
	},
	
	render: function () {
		var content = this.template({
			friend: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
	addFriend: function(event) {
		event.preventDefault();
		var newFriendship = new EatFriends.Models.Friendship({
			friend_id: this.model.id
		})
		newFriendship.save();
		this.render();
	}
	
});