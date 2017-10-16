define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Config = {
    // Views needed for this layout
    Views: {
      HeaderNav: require("../../common/header/view"),
      FooterNav: require("../../common/footer/view"),
    },
  };

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    el: "main",

    views: {
      "headernav": new Config.Views.HeaderNav(),
      "footernav": new Config.Views.FooterNav(),
    },
	events: {
      'click .pick_destination_location' : 'pick_destination_location',
    },
	pick_destination_location: function(){
		var location_name = document.getElementById("hotel_destination").value;
		if(location_name === null || location_name === undefined || location_name === ""){
			swal(
			  'Empty',
			  ' The Location Field Should not Be Left Empty',
			  'error'
			);			
		}else{		
			var redirectTo = '/picklocation';
		 // redirectTo += current_url.split("#picklocation")[1];
		  redirectTo += '/' + location_name;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
		}
	},
  });

});
