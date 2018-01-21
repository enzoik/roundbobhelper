define(function(require, exports, module) {
  "use strict";

  var app = require("app");
 var Cities = Backbone.Model.extend({});
  var Config = {
    // Views needed for this layout
    Views: {
      HeaderNav: require("../../common/header/view"),
      FooterNav: require("../../common/footer/view"),
    },
    api: {
      cities: 'app/api/cities/locations_autocomplete_search_service.php'
    },
    typingDelay: 500
  };

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    el: "main",

    views: {
      "headernav": new Config.Views.HeaderNav(),
      "footernav": new Config.Views.FooterNav(),
    },
	afterRender : function() {
		$("#pick_destination_location_id").show();
		$('#menu-icon-id').show();
	},
	events: {
      'click .pick_trip_details' : 'pick_trip_details',
	   // 'keyup #planner_destination': 'hotel_destination',
    },

	pick_trip_details: function(){
		var location_details = document.getElementById("clients_additional_details").value;
		if(location_details === null || location_details === undefined || location_details === ""){
			swal(
			  'Empty',
			  ' Details field should not be left empty',
			  'error'
			);
		}else{
		//var dest_id_check = location_name.split("-")[1];
		var dest_id = location_details;
		console.log("is dest_id_check",/\d/.test(dest_id));
		console.log("check id",dest_id);
		var has_number = /\d/.test(dest_id);
		if( location_details.length < 3){
			swal(
			  'Invalid',
			  ' Select a destination from the options given',
			  'error'
			);
		}else{
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner")[1];
			var splitted = current_url.split("#planner")[1].split("/");
			var redirectTo = '/planner';
			console.log("splitter",splitted[1]+"_"+splitted[2]);
			console.log("splitter",splitted[2].split("_")[2]);
			
			if(splitted[2].split("_")[2] == "m"){
			console.log("Spilitted","many");
				redirectTo += '/'+splitted[1];
				redirectTo += '/'+splitted[2];
				
				redirectTo += '/' + location_details;
				redirectTo += '/m';
				//2018-01-16_2018-01-30_s
				console.log("link",redirectTo);
				console.log("Spilitted","single");
				app.router.go(redirectTo);				
			}else{
				redirectTo += '/'+splitted[1];
				redirectTo += '/'+splitted[2];
				
				redirectTo += '/' + location_details;
				//2018-01-16_2018-01-30_s
				console.log("link",redirectTo);
				console.log("Spilitted","single");
				app.router.go(redirectTo);				
			}

		}

		}
	},
  });

});
