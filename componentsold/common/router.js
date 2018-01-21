define(function(require, exports, module) {
    var app = require('app');
    var Home = {

      Views: {
        Signup: require("./signup/view"),
        Login: require("./login/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "home/login": "login_func",
            "signup": "signup_func",
        },

        login_func: function() {
          new Home.Views.Login().render();
        },
        signup_func: function() {
          new Home.Views.Signup().render();
        },
    });
});
