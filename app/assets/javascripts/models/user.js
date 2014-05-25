window.EatFriends.Models.User = Backbone.Model.extend({
	urlRoot: 'api/users',
	
	parse: function (payload) {
		if (payload.user_food_items) {
			var user_food_items = payload.user_food_items;
			var friendships = payload.friendships;
			var that = this;
			
			_(user_food_items).each(function (user_food_data) {
				var user_food_item = 
				  new EatFriends.Models.UserFoodItem(user_food_data, {parse: true});
				
				that.user_food_items().add(user_food_item);
			});
			
			_(friendships).each(function (friendship_data) {
				var friendship = 
				  new EatFriends.Models.Friendship(friendship_data, {parse: true});
					
				that.friendships().add(friendship);
			});
	
			delete payload.user_food_items;
			delete payload.friendships;
		}
		
		return payload;
	},
	
	user_food_items: function () {
		this._user_food_items = this._user_food_items ||
		new EatFriends.Collections.UserFoodItems([], { user: this });
		
		return this._user_food_items;
	},
	
	friendships: function () {
		this._friendships = this._friendships ||
		new EatFriends.Collections.Friendships([], { user: this });
		
		return this._friendships;
	},
	
	// user methods for returning daily nutritional values
	
	totalFat: function() {
		var totalFat = 0;
		this.user_food_items().each( function(user_food_item) {
			totalFat += user_food_item.foodItem().get('total_fat')
		});
		return (parseInt(totalFat));
	},
	
	totalCarbs: function() {
		var totalCarbs = 0;
		this.user_food_items().each( function(user_food_item) {
			totalCarbs += user_food_item.foodItem().get('total_carbs')
		});
		return (parseInt(totalCarbs));
	},
	
	totalProtein: function() {
		var totalProtein = 0;
		this.user_food_items().each( function(user_food_item) {
			totalProtein += user_food_item.foodItem().get('total_protein')
		});
		return (parseInt(totalProtein));
	},
	
	caloriesSum: function() {
		var totalCalories = 0;
		this.user_food_items().each( function(user_food_item) {
			totalCalories += user_food_item.foodItem().get('calories')
		});
		return (parseInt(totalCalories));
	},
	
});