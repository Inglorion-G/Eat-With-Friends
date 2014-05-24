window.EatFriends.Models.UserFoodItem = Backbone.Model.extend({
	
	urlRoot: "/api/user_food_items",
	
	initialize: function(options) {
		this.user = options.user
	},
	
	foodItem: function(){
		this._foodItem = this._foodItem || new EatFriends.Models.FoodItem({
			id: this.get('food_item_id')
		});
		
		return this._foodItem;
	},

  parse: function (payload) {
  	if (payload.food_item) {
  		this.foodItem().set(payload.food_item);
			delete payload.food_item;
  	}
		
		return payload;
  }
})