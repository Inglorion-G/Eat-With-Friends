window.EatFriends.Models.User = Backbone.Model.extend({
	urlRoot: 'api/users',
	
	parse: function (payload) {
		if (payload.user_food_items) {
			this.user_food_items().set(payload.user_food_items, { parse: true })
			delete payload.user_food_items;
		}
		
		if (payload.friendships){
			this.friendships().set(payload.friendships, { parse: true });
			delete payload.friendships;
		}
		
		if (payload.comments){
			this.comments().set(payload.comments, { parse: true});
			delete payload.comments;
		}
		
		return payload;
	},
	
	gravatar: function() {
		return "https://secure.gravatar.com/avatar/" + this.get('email_hash')
	},
	
	comments: function () {
		this._comments = this._comments || 
		new EatFriends.Collections.Comments([], { user: this });
		
		return this._comments;
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
	
	alreadyFriend: function (user) {
		//should return true is this is already friends with user
		var friend = false;
		this.friendships().each(function(friendship){
			if(parseInt(friendship.get('friend_id')) == user.id){
				friend = true;
			}
		})
		return friend;
	},
	
	friends: function() {
		var friends = new EatFriends.Collections.Users()
		this.friendships().each( function(friendship) {
			friends.add(friendship.friend())
		})
		return friends;
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