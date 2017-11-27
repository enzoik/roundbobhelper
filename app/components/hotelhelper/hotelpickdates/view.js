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
		'click .select_date_single_user':'select_date_single_user',
		
	  'mouseover #check_out_id' : 'check_out_id',
	  'mouseover #check_in_id' : 'check_in_id',
	},
	check_in_id:function(e){
		var view = this;
		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:'2',
		  dateFormat: 'yy-mm-dd',
		  defaultDate:view.selectedDate,
		  onSelect:function(dateText,datePicker) {
			console.log('onSelect',dateText);
			view.selectedDate = dateText;  
			//$("#departure-date").val("");
		  }
		});
	},
	check_out_id:function(e){
		var that = this;
		var date = new Date();
		var value_t = date.getTime();
		
		var parts = document.getElementById("check_in_id").value.split("-");
		var final_d_date=new Date(parts[0], parts[1] - 1, parts[2]);
		
		var ONE_DAY = 1000 * 60 * 60 * 24;
		var difference_ms = Math.abs(final_d_date.getTime() - value_t);
		var days =Math.round(difference_ms/ONE_DAY) + 2;
		console.log(parts+" date","final_d_date"+ final_d_date.getTime()+"value"+value_t+" days "+days);
		//console.log($(e.currentTarget));
		//$.noConflict();
		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:days,
		  dateFormat: 'yy-mm-dd',
		  defaultDate:that.selectedDate,
		  onSelect:function(dateText,datePicker) {
			console.log('onSelect',dateText);
			that.selectedDate = dateText;  
			//$("#departure-date").val("");
		  }
		});
	},
	multiple_users:function(ev){
		/*var return_flight_id = document.getElementById("return_flight_id");
		var travel_date_id = document.getElementById("travel_date_id").value;
		var return_date_id = document.getElementById("return_date_id").value;*/
		
			var departure_date = document.getElementById("check_in_id").value;
			var return_date = document.getElementById("check_out_id").value;
			//var roundtrip = document.getElementById("switch-1");
			
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

				var current_url  = window.location.href.toString();
				var splitted = current_url.split("#picklocation")[1].split("/");
//http://localhost/roundbobhelperv1/dist/#picklocation/kamp/15-11-2017_12-10-2017_m/m
				var redirectTo = '/picklocation';
				console.log("multiple users",current_url.split("#picklocation").length);
				if(current_url.split("#picklocation").length < 3)
				{
					//redirectTo += current_url.split("#picklocation")[1];
					redirectTo += '/'+splitted[1];
				}else{
					redirectTo += current_url.split("#picklocation")[1].split("/")[0];
				}
			  
			  redirectTo += '/' + departure_date+"_"+return_date+"_m/m";
				console.log("multiple_view",redirectTo);
			  app.router.go(redirectTo);
		  
		}
	},
	select_date_single_user:function(ev){
			console.log("xxxxx");
			var departure_date = document.getElementById("check_in_id").value;
			var return_date = document.getElementById("check_out_id").value;
			//var roundtrip = document.getElementById("switch-1");
			
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
			
//http://localhost/roundbobhelperv1/dist/#picklocation/kampa/12-12-2017_30-12-2017_s
			var current_url  = window.location.href.toString();
			var splitted = current_url.split("#picklocation")[1].split("/");
			//console.log("multiple "+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
			console.log("current url",current_url);
			var redirectTo = '/picklocation';
			console.log("single users",current_url.split("#picklocation").length);
			if(current_url.split("#picklocation").length < 3)
			{
				//redirectTo += current_url.split("#picklocation")[1];
				redirectTo += '/'+splitted[1];
			}else{
				redirectTo += current_url.split("#picklocation")[1].split("/")[0];
			}
		  
		  redirectTo += '/' + departure_date+"_"+return_date+"_s";
		 console.log("single_view",redirectTo);
		 //flights/www_ww_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0
		  app.router.go(redirectTo);
		}
	},
  });

});
