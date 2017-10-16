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

	events:{
		'click .select_date_multiple_users':'multiple_users',
		'click .select_date_single_user':'select_date_single_user'
	},
	multiple_users:function(ev){
		/*var return_flight_id = document.getElementById("return_flight_id");
		var travel_date_id = document.getElementById("travel_date_id").value;
		var return_date_id = document.getElementById("return_date_id").value;*/
		
			var departure_date = document.getElementById("travel_date_id").value;
			var return_date = document.getElementById("return_date_id").value;
			var roundtrip = document.getElementById("switch-1");
			
		if(departure_date === null || departure_date === undefined || departure_date === ""){
			swal(
			  'Empty',
			  ' Dearture date Field Should not Be Left Empty',
			  'error'
			);			
		}else if(return_date === null || return_date === undefined || return_date === "" ){
			swal(
			  'Empty',
			  'Return Date Field Should not Be Left Empty',
			  'error'
			);				
		}else{
				var travel_trip="";
				if(roundtrip.checked){
					travel_trip="round";
				}else{
					travel_trip="oneway";
				}
				var current_url  = window.location.href.toString();
			//	console.log("multiple "+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
				//console.log(current_url.split("#flights")[1]);
				var redirectTo = '/picklocation';
				console.log("multiple users",current_url.split("#picklocation").length);
				if(current_url.split("#picklocation").length < 3)
				{
					redirectTo += current_url.split("#picklocation")[1];
				}else{
					redirectTo += current_url.split("#picklocation")[1].split("/")[0];
				}
			  
			  redirectTo += '/' + departure_date+"_"+return_date+"_"+travel_trip+"_m/m";
				console.log("multiple_view",redirectTo);
			  app.router.go(redirectTo);
		  
		}
	},
	select_date_single_user:function(ev){
			console.log("xxxxx");
			var departure_date = document.getElementById("travel_date_id").value;
			var return_date = document.getElementById("return_date_id").value;
			var roundtrip = document.getElementById("switch-1");
			
		if(departure_date === null || departure_date === undefined || departure_date === ""){
			swal(
			  'Empty',
			  ' Dearture date Field Should not Be Left Empty',
			  'error'
			);			
		}else if(return_date === null || return_date === undefined || return_date === "" ){
			swal(
			  'Empty',
			  'Return Date Field Should not Be Left Empty',
			  'error'
			);				
		}else{
			
			var travel_trip="";
			if(roundtrip.checked){
				travel_trip="round";
			}else{
				travel_trip="oneway";
			}
			var current_url  = window.location.href.toString();
			//console.log("multiple "+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
			console.log("current url",current_url);
			var redirectTo = '/picklocation';
			console.log("single users",current_url.split("#picklocation").length);
			if(current_url.split("#picklocation").length < 3)
			{
				redirectTo += current_url.split("#picklocation")[1];
			}else{
				redirectTo += current_url.split("#picklocation")[1].split("/")[0];
			}
		  
		  redirectTo += '/' + departure_date+"_"+return_date+"_"+travel_trip+"_s";
		 console.log("single_view",redirectTo);
		 //flights/www_ww_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0
		  app.router.go(redirectTo);
		}
	},
  });

});
