define(function(require, exports, module) {
    var app = require('app');
    var Special = {

      Views: {
        Special: require("./default/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "specialoffer": "specialhome",
        },

        specialhome: function() {
			new Special.Views.Special().render();
        },
    });
});
