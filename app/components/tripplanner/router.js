define(function(require, exports, module) {
    var app = require('app');
    var Tripplanner = {

      Views: {
        Tripplanner: require("./default/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "tripplanner": "tripplanner",
         
        },

        tripplanner: function() {
		new Tripplanner.Views.Tripplanner().render();
        },
    });
});
