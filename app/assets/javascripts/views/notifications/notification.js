EatFriends.Views.NotificationView = Backbone.View.extend({
 
  targetElement: '#message',

  tagName: 'div',

  className: 'notification',        

  defaultMessages: {
    'success': 'Success!',
    'error': 'Sorry! An error occurred in the process.',
    'warning': 'Are you sure you want to take this action?',
    'information': 'An unknown event occurred!'
  }, 

  cssClasses: {
    'success': 'accepted',
    'error': 'cancel',
    'warning': 'warning',
    'information': 'information'
  }, 

  events: {
    "click" : "closeNotification",
  },

  automaticClose: true, 

  initialize: function(options){

    // defaults
    var type = 'information';
    var text = this.defaultMessages[type]; 
    var target = this.targetElement; 

    // if any options were set, override defaults
    if(options && options.hasOwnProperty('type'))
      type = options.type;
    if(options && options.hasOwnProperty('text'))
      text = options.text; 
    if(options && options.hasOwnProperty('target')) 
      target = options.target;

    if(options && options.hasOwnProperty('automaticClose'))
    this.automaticClose = options.automaticClose;

    // is message already displayed in view? if yes, don't show again
    if($('.notification:contains('+text+')').length === 0) { 
      this.render(type, text, target);
    }

  },

  render: function(type, text, target){

    var that = this;
    this.$el.addClass(this.cssClasses[type]);
    this.$el.text(text);
    this.$el.prependTo(this.targetElement);

    // Automatically close after set time. also closes on click
    if(this.automaticClose) {
      setTimeout(function(){
        that.closeNotification();
      }, 2000);
    }
  },

  closeNotification: function() {

    var that = this;

    $(this.el).fadeOut(function() {
      that.unbind(); 
      that.remove(); 
    });
  }
 
});