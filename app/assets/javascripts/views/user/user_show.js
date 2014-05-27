window.EatFriends.Views.UserShow = Backbone.CompositeView.extend({

	template: JST['users/show'],
	
	initialize: function () {		
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.user_food_items(), "sync", this.render);
		this.listenTo(this.model.user_food_items(), "add", this.addUserFood);
		this.listenTo(this.model.user_food_items(), "remove", this.removeUserFood);
		this.listenTo(this.model.friendships(), "sync", this.render)
		this.listenTo(this.model.friendships(), "add", this.addUserFriend);
		
		this.model.user_food_items().each(this.addUserFood.bind(this));
		this.model.friendships().each(this.addUserFriend.bind(this));
		//this.addUserReports()
	},
	
	events: {
		"click a[data-toggle='tab']":"switchTabs",
		"click .add-food":"foodSearchPage",
		"click .submit-comment":"caloriesSum"
	},
	
	addUserFood: function(food_item) {
		var userFoodView = new EatFriends.Views.UserFoodItemShow({
			user: this.model,
			model: food_item
		});
		
		this.addSubview(".food-diary-body", userFoodView);
		userFoodView.render()
	},
	
	addUserFriend: function(friendship) {
		var friendShowView = new EatFriends.Views.UserFriendShow({
			user: this.model,
			model: friendship
		})
		
		this.addSubview(".friends-body", friendShowView)
		friendShowView.render()
	},
	
	removeUserFood: function(food_item) {
		var userFoodView = 
		_(this.subviews()[".food-diary-body"]).find(function (subview) {
			return subview.model === food_item;
		});
		
		var removedFoodId = userFoodView.model.get('food_item_id');
		var subtractCalories = 
			EatFriends.Collections.food_items.get(removedFoodId).calories;
		var currentCalories = parseInt($('.total-calories').text()) 
		
		// dynamically change value of calorie count
		$('.total-calories').html(currentCalories - subtractCalories)
		this.removeSubview(".food-diary-body", userFoodView);
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
		Backbone.history.navigate("#/food_items/index")
	},
	
	// addUserReports: function() {
// 		//var pieData = [carbs, fat, protein]
// 		var userReportView = new EatFriends.Views.ReportShow({
// 			el: '.pie-chart',
// 			// data: [{"label":"Protein", "value": 5 },//this.model.totalProtein()}, 
// // 		        {"label":"Fat", "value": 5 },//this.model.totalFat()}, 
// // 		        {"label":"Carbs", "value": 5 }],//this.model.totalCarbs()}],
// 		  base_height: 220,
// 		  breakpoints: {
// 		    728: 0.9,
// 		    420: 0.7,
// 		    380: 0.65
// 		  }
// 		});
// 		$(".pie-chart").html("")
// 		$(".pie-chart").html(userReportView.render())
// 		this.render()
// 	},
	
});