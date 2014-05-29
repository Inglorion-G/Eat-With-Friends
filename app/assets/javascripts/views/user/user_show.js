window.EatFriends.Views.UserShow = Backbone.CompositeView.extend({

	template: JST['users/show'],
	
	initialize: function () {	
		this.globalUsers = EatFriends.Collections.users;
		this.listenTo(this.model, "sync", this.render);
		
		//this.listenTo(EatFriends.Collections.users, "sync", this.render);
		
		this.listenTo(this.model.user_food_items(), "sync", this.render);
		this.listenTo(this.model.user_food_items(), "add", this.addUserFood);
		this.listenTo(this.model.user_food_items(), "remove", this.removeUserFood);
		
		this.listenTo(this.model.friendships(), "sync", this.render);
		this.listenTo(this.model.friendships(), "add", this.addUserFriend);
		
		this.listenTo(this.model.comments(), "sync", this.render);
		this.listenTo(this.model.comments(), "add", this.addUserComment);
		
		this.model.user_food_items().each(this.addUserFood.bind(this));
		this.model.friendships().each(this.addUserFriend.bind(this));
		this.model.comments().each(this.addUserComment.bind(this));
	},
	
	events: {
		"click a[data-toggle='tab']": "switchTabs",
		"click .add-food": "foodSearchPage",
		"click .submit-comment": "addComment"
	},
	
	addUserFood: function(food_item) {
		var userFoodView = new EatFriends.Views.UserFoodItemShow({
			user: this.model,
			model: food_item
		});
		
		this.addSubview(".food-diary-body", userFoodView);
		userFoodView.render()
		this.render()
	},
	
	addUserFriend: function(friendship) {
		var friendShowView = new EatFriends.Views.UserFriendShow({
			user: this.model,
			model: friendship
		})
		
		this.addSubview(".friends-body", friendShowView)
		friendShowView.render()
	},
	
	addUserComment: function(comment) {
		var commentShowView = new EatFriends.Views.CommentShow({
			user: this.model,
			model: comment
		})
		
		this.addSubview(".news-feed-comments", commentShowView)
		commentShowView.render()
	},
	
	removeUserFood: function(food_item) {
		var userFoodView = 
		_(this.subviews()[".food-diary-body"]).find(function (subview) {
			return subview.model === food_item;
		});
		
		this.decrementUserCalories(userFoodView);
		
		// var removedFoodId = userFoodView.model.get('food_item_id');
// 		var subtractCalories = 
// 			EatFriends.Collections.food_items.get(removedFoodId).calories;
// 		var currentCalories = parseInt($('.total-calories').text()) 
		
		// dynamically change value of calorie count
		// $('.total-calories').html(currentCalories - subtractCalories)
		this.removeSubview(".food-diary-body", userFoodView);
	},
	
	decrementUserCalories: function(userFoodView) {
		var removedFoodId = userFoodView.model.get('food_item_id');
		var subtractCalories = 
			EatFriends.Collections.food_items.get(removedFoodId).calories;
		var currentCalories = parseInt($('.total-calories').text()) - subtractCalories
		
		var currentProgress = (currentCalories / 3000) * 100
		// dynamically change value of calorie count
		$('.total-calories').html(currentCalories)
		$('.progress-bar').attr("style", "width: " + currentProgress + "%")
	},
	
	render: function () {
		var content = this.template({
			user: this.model
		});
		
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	switchTabs: function(event) {
		event.preventDefault();
		$(event.currentTarget).tab('show');
	},
	
	foodSearchPage: function (event) {
		event.preventDefault();
		Backbone.history.navigate("#/food_items/index");
	},
	
	addComment: function(event) {
		event.preventDefault();
		var commentBody = $(".comment-text-field").val()
		var newComment = new EatFriends.Models.Comment({
			body: commentBody,
			author_id: currentUserID,
			commentable_id: this.model.id,
			commentable_type: "User"
		})
		newComment.save();
		this.model.comments().add(newComment)
	}
	
});