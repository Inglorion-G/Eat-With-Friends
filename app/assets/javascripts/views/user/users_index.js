EatFriends.Views.UsersIndex = Backbone.CompositeView.extend({
	
	initialize: function() {
		// this.collection = options.collection;
// 		this.listenTo(this.collection, "add remove sync", this.render)
	},
	
	template: JST['users/friends/index'],
	
	events: {
		"submit #search-friends": "friendSearchResults"
	},
	
	render: function () {
		var content = this.template({
			users: this.collection
		});
		this.$el.html(content);
		return this
	},
	
	friendSearchResults: function(event) {
		event.preventDefault();		
		var searchResultsView = new EatFriends.Views.FriendSearchResults({
			collection: EatFriends.Collections.users
		});
		
		this.addSubview(".friend-search-results", searchResultsView);
		searchResultsView.render();
	}
	
});

// friendSearchResults.fetch({
// 	success: function () {
// 		var friendSearchResultsView = new EatFriends.Views.FriendSearchResults({
// 			friendships: that.collection
// 		})
// 		
// 	}
// });
//var friendSearchResults = new EatFriends.Collections.friendships();