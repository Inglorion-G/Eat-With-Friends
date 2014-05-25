window.EatFriends.Collections.Friendships = Backbone.Collection.extend({
	
	model: EatFriends.Models.Friendship,
	
	url: function () {
		return this.user.url() + "/friendships"
	},
	
	initialize: function (models, options) {
		this.user = options.user;
	}
	
});