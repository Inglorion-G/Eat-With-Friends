window.EatFriends.Views.CommentShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.user = options.user
		this.listenTo(this.user.comments(), "add sync", this.render)
	},
	
	template: JST["comments/show"],
	
	render: function () {
		var content = this.template({
			comment: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
});