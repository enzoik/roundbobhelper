define(function(require, exports, module) {
  "use strict";

  var app = require('app');

  module.exports = {
    // Collection: require("./collection"),
    //
    Views: {
      // Item: require("./item/view"),
      // List: require("./list/view"),
      LoginForm: require("./loginForm/view"),
    },

    loginRedirect: null, // Url to redirect when the customer has logged in
    logoutRedirect: null, // Url when the customer has logged out

    onLogin: function(){
      if(this.loginRedirect){
        app.router.go(this.loginRedirect);
      }
    },

    onLogout: function(){
      if(this.logoutRedirect){
        app.router.go(this.logoutRedirect);
      }
    },

    login: function(){
      if(!$('LoginForm').length){
        $('body').append('<LoginForm style="display:block !important;"></LoginForm>');
        console.log("yes");
      }
      new this.Views.LoginForm().render();
      // console.log("logincalled", new this.Views.LoginForm().template());
      // console.log("logincalled", require("ldsh!./loginForm/template"));
      // var notice = new PNotify({
      //     text: new this.Views.LoginForm().template(),
      //     icon: false,
      //     width: 'auto',
      //     hide: false,
      //     buttons: {
      //         closer: false,
      //         sticker: false
      //     },
      //     insert_brs: false
      // });
      // notice.get().find('form.pf-form').on('click', '[name=cancel]', function() {
      //     notice.remove();
      // }).submit(function() {
      //     var username = $(this).find('input[name=username]').val();
      //     if (!username) {
      //         alert('Please provide a username.');
      //         return false;
      //     }
      //     notice.update({
      //         title: 'Welcome',
      //         text: 'Successfully logged in as ' + username,
      //         icon: true,
      //         width: PNotify.prototype.options.width,
      //         hide: true,
      //         buttons: {
      //             closer: true,
      //             sticker: true
      //         },
      //         type: 'success'
      //     });
      //     return false;
      // });
      // this.onLogin.call();
    },

    logout: function(){
      this.resetAuth();
      this.onLogout.call();
    },

    loggedIn: function(){
      if(this.auth.userId && this.auth.authToken) {
        return true;
      }

      return false;
    },

    // Returns the auth details/object about the user.
    auth: {},

    resetAuth: function(){
      this.auth = {};
    },

    setAuth: function(auth){
      this.auth = auth;
    },

    getAuth: function(auth){
      return this.auth;
    },
  };
});
