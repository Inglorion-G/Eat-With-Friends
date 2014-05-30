window.EatFriends.Views.UserFoodItemShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.user = options.user
		this.listenTo(this.user.user_food_items(), "add remove sync", this.render)
	},
	
	template: JST["user_food_items/show"],
	
	events: {
		"click .remove-food-button": "destroyFoodItem",
		"click .user-food-item": "info"
	},
	
	render: function () {
		var foodItem = this.model.foodItem();
		var content = this.template({
			user_food_item: this.model,
			food_item: foodItem
		});
		
		this.$el.html(content);
		return this;
	},
	
	info: function (event) {
		if ($(event.target).hasClass("remove-food-button")) {
			return;
		}
		$("#" + this.model.foodItem().id + "-nutrition-info").modal('toggle');
	},
	
	destroyFoodItem: function (event) {
		event.preventDefault();
		this.model.destroy();
	},
});