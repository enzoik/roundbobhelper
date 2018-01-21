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
		'click .select_date_multiple_users_planner':'multiple_users',
		'click .select_date_single_user_planner':'select_date_single_user',
		
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

		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:days,
		  dateFormat: 'yy-mm-dd',
		  defaultDate:that.selectedDate,
		  onSelect:function(dateText,datePicker) {
			console.log('onSelect',dateText);
			that.selectedDate = dateText;  
		  }
		});
	},
	multiple_users:function(ev){
		
			var departure_date = document.getElementById("check_in_id").value;
			var return_date = document.getElementById("check_out_id").value;
			
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
				var splitted = current_url.split("#planner")[1].split("/");
				var redirectTo = '/planner';
				console.log("multiple users",current_url.split("#planner").length);
				if(current_url.split("#planner").length < 3)
				{
					redirectTo += '/'+splitted[1];
				}else{
					redirectTo += current_url.split("#planner")[1].split("/")[0];
				}
			  
			  redirectTo += '/' + departure_date+"_"+return_date+"_m";
				console.log("multiple_view",redirectTo);
			  app.router.go(redirectTo);
		  
		}
	},
	select_date_single_user:function(ev){
			console.log("xxxxx");
			var departure_date = document.getElementById("check_in_id").value;
			var return_date = document.getElementById("check_out_id").value;
			
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
			var splitted = current_url.split("#planner")[1].split("/");
			console.log("current url",current_url);
			var redirectTo = '/planner';
			console.log("single users",current_url.split("#planner").length);
			if(current_url.split("#planner").length < 3)
			{
				redirectTo += '/'+splitted[1];
			}else{
				redirectTo += current_url.split("#planner")[1].split("/")[0];
			}
		  
		  redirectTo += '/' + departure_date+"_"+return_date+"_s";
		 console.log("single_view",redirectTo);
		  app.router.go(redirectTo);
		}
	},
  });

});
