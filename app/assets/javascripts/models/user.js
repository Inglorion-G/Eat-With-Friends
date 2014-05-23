window.EatFriends.Models.User = Backbone.Model.extend({
	urlRoot: 'api/users',
	
	user_food_items: function () {
		this._user_food_items = this._user_food_items ||
		new EatFriends.Collections.UserFoodItems([], { user: this });
		return this._user_food_items;
	},
	
	parse: function (payload) {
		if (payload.user_food_items) {
			this.user_food_items().set(payload.user_food_items, { parse: true });
			delete payload.user_food_items;
		}
		
		return payload;
	}
})