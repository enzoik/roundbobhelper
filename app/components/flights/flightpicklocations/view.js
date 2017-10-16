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
      'click .continue_to_flight_pick_dates' : 'continue_to_flight_pick_dates',
    },
	
	continue_to_flight_pick_dates:function(e){
			var flight_from = document.getElementById("flight_from").value;
			var flight_to = document.getElementById("flight_to").value;
		if(flight_from === null || flight_from === undefined || flight_from === ""){
			swal(
			  'Empty',
			  ' From Location Field Should not Be Left Empty',
			  'error'
			);			
		}else if(flight_to === null || flight_to === undefined || flight_to === "" ){
			swal(
			  'Empty',
			  'Destination Field Should not Be Left Empty',
			  'error'
			);				
		}else{
			
			var economy = document.getElementById("option-1");
			var business = document.getElementById("option-2");
			var first_class = document.getElementById("option-3");
			var flight_class="";
			if(economy.checked) {
				flight_class="Economy";
			}else if(business.checked){
				flight_class="Business";
			}else if(first_class.checked){
				flight_class="First";
			}
		    var redirectTo = '/flights';
		  redirectTo += '/' + flight_from+"_"+flight_to+"_"+flight_class;
		 

		  app.router.go(redirectTo);
		}
	},
  });

});
