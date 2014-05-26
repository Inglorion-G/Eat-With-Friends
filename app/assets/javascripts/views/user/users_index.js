EatFriends.Views.UsersIndex = Backbone.CompositeView.extend({
	
	initialize: function() {
		this.originalCollection = this.collection;
		this.x = new EatFriends.Collections.Users();
	},
	
	template: JST['users/friends/index'],
	
	events: {
		"submit #search-friends": "friendSearchResults",
		"keyup": "search"
	},
	
	render: function () {
		var content = this.template({
			users: this.collection
		});
		this.$el.html(content);
		return this
	},
	
	friendSearchResults: function() {
		$(".friend-search-results").empty();	
		var searchResultsView = new EatFriends.Views.FriendSearchResults({
			collection: this.x
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
		this.x.set(searchCollection)
		this.friendSearchResults()
	}
	
});