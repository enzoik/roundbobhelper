define(function(require, exports, module) {
    var app = require('app');
    var Special = {

      Views: {
        Special: require("./default/view"),
        Success: require("./successpage/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "specialoffer": "specialhome",
            "specialoffer/successpage": "successpage",
        },

        specialhome: function() {
			new Special.Views.Special().render();
        },
        successpage: function() {
			new Special.Views.Success().render();
        },
    });
});
