EatFriends.Views.UsersIndex = Backbone.CompositeView.extend({
	
	initialize: function() {
		this.originalCollection = this.collection;
		this.listenTo(this.collection, "sync", this.render);
		this.friendSearchResults = new EatFriends.Collections.Users();
	},
	
	template: JST['users/friends/search'],
	
	events: {
		// "submit #search-friends": "handleFriendSearchResults",
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
		});
		
		this.friendSearchResults.set(searchCollection)
		this.friendSearchResults.remove(currentUserID)
		
		this.handleFriendSearchResults()
	}
	
});