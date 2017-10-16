define(function(require, exports, module) {
  "use strict";

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    el: 'LoginForm',

    initialize: function(){

    },

    /*
    afterRender: function(){
      var that = this;
      that.notice = new PNotify({
          text: that.$el.find('#form_notice').html(),
          icon: false,
          width: 'auto',
          hide: false,
          buttons: {
              closer: false,
              sticker: false
          },
          insert_brs: false
      });
      that.notice.get().find('form.pf-form').on('click', '[name=cancel]', function() {
          that.notice.remove();
      }).submit(function() {
          var username = $(this).find('input[name=username]').val();
          if (!username) {
              alert('Please provide a username.');
              return false;
          }
          that.notice.update({
              title: 'Welcome',
              text: 'Successfully logged in as ' + username,
              icon: true,
              width: PNotify.prototype.options.width,
              hide: true,
              buttons: {
                  closer: true,
                  sticker: true
              },
              type: 'success'
          });
          return false;
      });
    },
*/
    // events: {
    //   "submit form": "updateOrg"
    // }
  });
});
