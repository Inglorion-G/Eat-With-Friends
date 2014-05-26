EatFriends.Views.FriendSearchResults = Backbone.CompositeView.extend({
	template: JST['users/friend_search_results'],
	
	initialize: function (options) {
		this.collection = options.collection
		this.addFriendSubviews();
		
		// var friends = new Bloodhound({
// 		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
// 		  queryTokenizer: Bloodhound.tokenizers.whitespace,
// 		  // `states` is an array of state names defined in "The Basics"
// 		  local: $.map(this.collection.models, function(state) { return { value: friend }; })
// 		});
//  
// 		// kicks off the loading/processing of `local` and `prefetch`
// 		friends.initialize();
	},
	
	render: function () {
		var content = this.template({
			users: this.collection
		});
		this.$el.html(content);
		this.attachSubviews();
		
		// $('#bloodhound .typeahead').typeahead({
	// 	  hint: true,
	// 	  highlight: true,
	// 	  minLength: 1
	// 	},
	// 	{
	// 	  name: 'friends',
	// 	  displayKey: 'value',
	// 	  // `ttAdapter` wraps the suggestion engine in an adapter that
	// 	  // is compatible with the typeahead jQuery plugin
	// 	  source: friends.ttAdapter()
	// 	});
		
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