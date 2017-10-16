define(function(require, exports, module) {
  "use strict";

  // var Layout = require("layoutmanager");
  // var app = require("app");
  // var sweetAlert = require("sweetAlert");

  // swal("Oops...", "Something went wrong!", "error");

  module.exports = Backbone.View.extend({

      targetElement: '#notificationMessages',

      tagName: 'div',

      className: 'notification',

      defaultMessages: {
          'success': 'Success!',
          'error': 'Sorry! An error occurred in the process',
          'warning': 'Are you sure you want to take this action?',
          'information': 'An unknown event occurred'
      },

      cssClasses: {
          'success': 'alert alert-success',
          'error': 'alert alert-error',
          'warning': 'alert alert-warning',
          'information': 'alert alert-info'
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

          swal("Oops...", "Something went wrong!", "error");
          // swal("Hello world!");

          // var self = this;
          // this.$el.addClass(this.cssClasses[type]);
          // this.$el.text(text);
          // this.$el.prependTo(this.targetElement);
          //
          // // Automatically close after set time. also closes on click
          // if(this.automaticClose) {
          //     setTimeout(function(){
          //         self.closeNotification();
          //     }, 3000);
          // }
      },

      closeNotification: function() {

          var self = this;

          $(this.el).fadeOut(function() {
              self.unbind();
              self.remove();
          });
      }

  });
});
