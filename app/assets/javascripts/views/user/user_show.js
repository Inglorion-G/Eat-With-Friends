window.EatFriends.Views.UserShow = Backbone.CompositeView.extend({

	template: JST['users/show'],
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.user_food_items(), "sync", this.render);
		this.listenTo(this.model.user_food_items(), "add", this.addUserFood);
		this.listenTo(this.model.user_food_items(), "remove", this.removeUserFood);
		
		this.model.user_food_items().each(this.addUserFood.bind(this));
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
	
	removeUserFood: function(food_item) {
		var userFoodView = 
		_(this.subviews()[".food-diary-body"]).find(function (subview) {
			return subview.model === food_item;
		});
		
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
	
});