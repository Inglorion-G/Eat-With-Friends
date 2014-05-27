EatFriends.Views.FriendSearchResults = Backbone.CompositeView.extend({
	template: JST['users/friends/friend_search_results'],
	
	initialize: function (options) {
		this.collection = options.collection
		this.addFriendSubviews();
	},
	
	render: function () {
		var content = this.template({
			users: this.collection
		});
		this.$el.html(content);
		this.attachSubviews();
		
		return this
	},
	
	alreadyFriend: function (user) {
	  var currentUser = EatFriends.Collections.users.get(currentUserID);
		return currentUser.friendships().some( function(friendship) {
			friendship.get('friend_id') === user.id
		})
	},
	
	addFriendSubviews: function () {
		var currentUser = EatFriends.Collections.users.getOrFetch(currentUserID);
		var that = this;
		this.collection.each( function(user) {
			var friendStatus = that.alreadyFriend(user);
			var friendShowView = new EatFriends.Views.FriendShow({
				model: user,
				alreadyFriend: friendStatus
			})
			that.addSubview("#friend-search-panel", friendShowView);
		})	
	}
});