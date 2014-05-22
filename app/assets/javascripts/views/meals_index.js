Trellino.Views.MealsIndex = Backbone.View.extend({
	
	template: JST['meals/index'],
	
	initialize: function () {
		this.listenTo(this.collection, "sync add", this.render);
	},
	
	render: function() {
		var content = this.template({
			meals: this.collection
		});
		this.$el.html(content);
		return this;
	},
	
});