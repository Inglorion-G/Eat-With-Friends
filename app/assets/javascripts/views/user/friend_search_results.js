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
		var that = this;
		this.collection.each( function(user) {
			var friendShowView = new EatFriends.Views.FriendShow({
				model: user
			})
			that.addSubview("#friend-search-panel", friendShowView);
		})	
	}
});