define(function(require, exports, module) {
    var app = require('app');
    var Home = {

      Views: {
        Home: require("./default/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "": "home",
            "ClassRoom/backbonejs/roundbob/dist/": "home",
            "ClassRoom/backbonejs/roundbob/dist/index.html": "home",
        },

        home: function() {
          new Home.Views.Home().render();

          $('mainHotelDetails').html("");
          $('main').show();
          app.activeRouteFunction = 'Home.home';
        },
    });
});
