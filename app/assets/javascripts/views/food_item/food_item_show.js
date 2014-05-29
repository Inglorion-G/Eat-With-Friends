window.EatFriends.Views.FoodItemShow = Backbone.CompositeView.extend({
	
	initialize: function() {
		this.listenTo(EatFriends.Collections.food_items, "add", this.render)
	},
	
	template: JST["food_items/show"],
	
	events: {
		"click .add-food-button": "addFoodItem",
		"click .modal-add-food-button": "addFoodItem",
		"click .food-item": "info"
	},
	
	render: function () {
		var content = this.template({
			food_item: this.model
		});
		
		this.$el.html(content);
		return this;
	},
	
	info: function (event) {
		$("#" + this.model.id + "-nutrition-info").modal('toggle');
	},
	
	addFoodItem: function(event) {
		event.preventDefault();
		var newUserFoodItem = new EatFriends.Models.UserFoodItem({
			food_item_id: this.model.id
		})
		newUserFoodItem.save( {}, {
			success: function(response) {
				currentUser().user_food_items().add(newUserFoodItem)
			}
		});
		this.render();
	}
	
});