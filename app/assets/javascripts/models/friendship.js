window.EatFriends.Models.Friendship = Backbone.Model.extend({
	
	urlRoot: "/api/friendships",
	
	initialize: function(options) {
		this.user = options.user
	},
	
	friend: function(){
		this._friend = this._friend || new EatFriends.Models.User({
			id: this.get('friend_id')
		});
		
		return this._friend;
	},

  parse: function (payload) {
  	if (payload.friend) {
  		this.friend().set(payload.friend);
			delete payload.friend;
  	}
		
		return payload;
  }
});