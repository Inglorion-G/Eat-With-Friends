window.EatFriends.Views.UserShow = Backbone.CompositeView.extend({

	template: JST['users/show'],
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click #home":"switchTabs",
		"click .add-food":"foodSearchPage",
	},
	
	render: function () {
		var content = this.template({
			user: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
	switchTabs: function(event) {
		event.preventDefault();
		$(event.currentTarget).tab('show');
	},
	
	foodSearchPage: function (event) {
		event.preventDefault();
		Backbone.history.navigate("#/food_items/index")
	}
	
});