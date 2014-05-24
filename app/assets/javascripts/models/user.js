window.EatFriends.Models.User = Backbone.Model.extend({
	urlRoot: 'api/users',
	
	parse: function (payload) {
		if (payload.user_food_items) {
			var user_food_items = payload.user_food_items;
			var that = this;
			
			_(user_food_items).each(function (user_food_data) {
				var user_food_item = new EatFriends.Models.UserFoodItem(user_food_data);
				
				that.user_food_items().add(user_food_item);
			});
	
			delete payload.user_food_items;
		}
		
		return payload;
	},
	
	user_food_items: function () {
		this._user_food_items = this._user_food_items ||
		new EatFriends.Collections.UserFoodItems([], { user: this });
		return this._user_food_items;
	}
	
});