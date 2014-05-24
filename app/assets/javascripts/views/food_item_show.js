window.EatFriends.Views.FoodItemShow = Backbone.CompositeView.extend({
	template: JST["food_items/show"],
	
	events: {
		"click .add-food-button":"addFoodItem"
	},
	
	render: function () {
		var content = this.template({
			food_item: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
	addFoodItem: function(event) {
		event.preventDefault();
		var newUserFoodItem = new EatFriends.Models.UserFoodItem({
			food_item_id: this.model.id
		})
		newUserFoodItem.save();
	}
	
});