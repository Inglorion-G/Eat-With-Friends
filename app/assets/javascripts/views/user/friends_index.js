EatFriends.Views.FriendsIndex = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.collection = options.collection
	},
	
	template: JST['users/friends/index'],
	
	events: {
		"submit #search-friends": "handleFriendSearchResults",
		"keyup": "search"
	},
	
	render: function () {
		var content = this.template({
			users: this.collection
		});
		this.$el.html(content);
		return this
	},
	
	handleFriendSearchResults: function() {
		$(".friend-search-results").empty();	
		var searchResultsView = new EatFriends.Views.FriendSearchResults({
			collection: this.friendSearchResults
		});
		
		this.addSubview(".friend-search-results", searchResultsView);
		searchResultsView.render();
	},
	
	search: function() {
		var string = $("#friend-search-term").val();
		
		var searchString = new RegExp("^.*" + string + ".*$", "i")
		var searchCollection = this.collection.filter( function(model) {
			return searchString.test(model.get('username'))
		})
		this.friendSearchResults.set(searchCollection)
		this.handleFriendSearchResults()
	}
	
});