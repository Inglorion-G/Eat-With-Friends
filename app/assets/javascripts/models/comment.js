EatFriends.Models.Comment = Backbone.Model.extend({
	urlRoot: "api/comments",
	
	initialize: function(options) {
		this.author_id = options.author_id;
		this.commentableId = options.commentableId;
		this.commentableType = options.commentableType;
		this.body = options.body;
	},
})