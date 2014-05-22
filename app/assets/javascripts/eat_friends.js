window.EatFriends = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //alert('Hello from Backbone!');
  }
};

Backbone.CompositeView = Backbone.View.extend({
	addSubview: function (selector, subview) {
		this.subviews(selector).push(subview);
		this.attachSubview(selector, subview.render());
	},
	
	attachSubview: function (selector, subview) {
		this.$(selector).append(subview.$el);
		subview.delegateEvents();
		
		if (subview.attachSubviews) {
			subview.attachSubviews();
		}
		
	},
	
	attachSubviews: function () {
		var view = this;
		_(this.subviews()).each(function (subviews, selector) {
			view.$(selector).empty();
			if (view.compareBy) {
				subviews.sort(view.compareBy);
			}
			_(subviews).each(function (subview) {
				view.attachSubview(selector, subview);
			});
		});
	},
	
	compareBy: function(subview1, subview2) {
		var result = subview1.model.get('rank') - subview2.model.get('rank');
		if (result === 0) {
			return -1;
		} else {
			return result;
		}
	},
	
	remove: function () {
		Backbone.View.prototype.remove.call(this);
		
		_(this.subviews()).each(function (subviews) {
			_(subviews).each(function (subview) { subview.remove(); });
		});
	},
	
	removeSubview: function (selector, subview) {
		subview.remove();
			
		var subviews = this.subviews(selector);
		subviews.splice(subviews.indexOf(subview), 1);
	},
	
	// removeAllSubviews: function (selector) {
	// 	//var clonedSubviews = _.clone(this.subviews())
	// 	var subviews = this.subviews()[selector]
	// 	var that = this
	// 	_(subviews).each( function (subview) {
	// 		that.removeSubview(selector, subview)
	// 	});
	// },
	
	// renderSubviews: function () {
	// 	var view = this;
	// 	
	// 	_(this.subviews()).each(function (selectorSubviews, selector) {
	// 		var $selectorEl = view.$(selector)
	// 		$selectorEl.empty();
	// 		
	// 		_(selectorSubviews).each(function (subview) {
	// 			$selectorEl.append(subview.render().$el);
	// 			subview.delegateEvents();
	// 		});
	// 	});
	// },
	
	subviews: function (selector) {
		this._subviews = this._subviews || {};
		
		if (!selector) {
			return this._subviews;
		} else {
			this._subviews[selector] = this._subviews[selector] || []
			return this._subviews[selector];
		}
	}
});

$(document).ready(function(){
  EatFriends.initialize();
});
