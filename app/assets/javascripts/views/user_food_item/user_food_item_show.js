window.EatFriends.Views.UserFoodItemShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.user = options.user
		this.listenTo(this.user.user_food_items(), "add remove sync", this.render)
	},
	
	template: JST["user_food_items/show"],
	
	events: {
		"click .remove-food-button": "destroyFoodItem"
	},
	
	render: function () {
		var content = this.template({
			user_food_item: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
	destroyFoodItem: function (event) {
		event.preventDefault();
		this.model.destroy();
	},
});