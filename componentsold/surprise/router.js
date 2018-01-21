define(function(require, exports, module) {
    var app = require('app');
    var Surprise = {

      Views: {
        Surprise: require("./default/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "surprise": "surprise",
         
        },

        surprise: function() {
		new Surprise.Views.Surprise().render();
        },
    });
});
