window.EatFriends.Models.UserFoodItem = Backbone.Model.extend({
	foodItem: function(){
		return EatFriends.Collections.food_items.getOrFetch(this.get('food_item_id'));
	}
})