define(function(require, exports, module) {
    var app = require('app');
    var Tripplanner = {

      Views: {
        Tripplanner: require("./default/view"),
		Success: require("./successpage/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "tripplanner": "tripplanner",
            "tripplanner/successpage": "successpage",
			
         
        },

        tripplanner: function() {
		new Tripplanner.Views.Tripplanner().render();
        },
        successpage: function() {
			new Tripplanner.Views.Success().render();
        },
    });
});
