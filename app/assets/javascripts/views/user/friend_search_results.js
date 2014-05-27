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
	
	addFriendSubviews: function () {
		var currentUser = EatFriends.Collections.users.getOrFetch(currentUserID);
		var that = this;
		this.collection.each( function(user) {
			var friendShowView = new EatFriends.Views.FriendShow({
				model: user,
				alreadyFriend: currentUser
			})
			that.addSubview("#friend-search-panel", friendShowView);
		})	
	}
});