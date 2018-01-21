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
	afterRender : function() {
		/*$('#go_backward_btn').show();
		$('#go_forward_btn').show();
		$('#return-flight-card').hide();
		$('input[name=mdl-switch-input1]').attr('checked', false);*/
		$('#go_backward_btn').show();
		$('#go_forward_btn').show();
		$('#return-flight-card').hide();
		$('#return_date_id').hide();
		$('input[name=mdl-switch-input1]').attr('checked', true);
	},
	events: {
      'click .multiplepeopleGetDateactivity' : 'multiplepeopleGetDate',
      'click .alonepeopleGetDateactivity' : 'alonepeopleGetDate',
	  'mouseover #departure-date' : 'departure_date',
	  'mouseover #return-date' : 'return_date',
    },
	
	departure_date:function(e){
		var view = this;
		//console.log($(e.currentTarget));
		//$.noConflict();
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
	return_date:function(e){
		var that = this;
		var date = new Date();
		var value_t = date.getTime();
		
		var parts = document.getElementById("departure-date").value.split("-");
		var final_d_date=new Date(parts[0], parts[1] - 1, parts[2]);
		
		var ONE_DAY = 1000 * 60 * 60 * 24;
		var difference_ms = Math.abs(final_d_date.getTime() - value_t);
		var days =Math.round(difference_ms/ONE_DAY) + 1;
	//	console.log(parts+" date","final_d_date"+ final_d_date.getTime()+"value"+value_t+" days "+days);
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
	date_picker:function(){
		
	},
	
	multiplepeopleGetDate:function(e){
		//console.log("multiple");
			var departure_date = document.getElementById("departure-date").value;
			var return_date = document.getElementById("return-date").value;
			var roundtrip = document.getElementById("switch-1");
			var travel_trip="";
				
			if(!roundtrip.checked){
					travel_trip="oneway";

			}else{
				//travel_trip="round";
				travel_trip="oneway";
			}
		if(departure_date === null || departure_date === undefined || departure_date === ""){
			swal(
			  'Empty',
			  ' Departure Date Field Should not Be Left Empty',
			  'error'
			);			
	/*	}else if(!roundtrip.checked ){
			if(return_date === null || return_date === undefined || return_date === "" ){
				swal(
				  'Empty',
				  'Return Date Field Should not Be Left Empty',
				  'error'
				);
			}*/				
		}else{
			var current_url  = window.location.href.toString();
		//	console.log("multiple "+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
			//console.log(current_url.split("#flights")[1]);
			
			console.log("length",current_url.split("#activities").length);

			var last_check="";
			if(current_url.split("#activities")[1].split("/").length > 2){
				var last_spliter = current_url.split("#activities")[1].split("/")[2];
				 last_check = last_spliter.split("_")[3];				
			}
		console.log("last_checker",last_check);
		var redirectTo = '';
		if(last_check =="m" && current_url.split("#activities")[1].split("/").length > 2 ){
			
		}else if(current_url.split("#activities").length < 3)
			{	
				redirectTo = '/activities';
				redirectTo += current_url.split("#activities")[1];
			   redirectTo += '/' + departure_date+"_"+return_date+"_"+travel_trip+"_m/m";
				console.log("multiple_view",redirectTo);
			   app.router.go(redirectTo);

			}else{
				redirectTo = '/activities';
				redirectTo += current_url.split("#activities")[1].split("/")[0];
			  redirectTo += '/' + departure_date+"_"+return_date+"_"+travel_trip+"_m/m";
				console.log("multiple_view",redirectTo);
			  app.router.go(redirectTo);
			}
		  

		}
	},
	alonepeopleGetDate:function(e){
		//console.log("single");
		var departure_date = document.getElementById("departure-date").value;
		var return_date = document.getElementById("return-date").value;
		var roundtrip = document.getElementById("switch-1");
		var travel_trip="";
		var redirectTo="";
		if(!roundtrip.checked){
			travel_trip="oneway";
		}else{
			//travel_trip="round";
			travel_trip="oneway";
		}
		if(departure_date === null || departure_date === undefined || departure_date === ""){
			swal(
			  'Empty',
			  ' Departure Date Field Should not Be Left Empty',
			  'error'
			);			
		/*}else if(return_date === null || return_date === undefined || return_date === "" ){
			swal(
			  'Empty',
			  'Return Date Field Should not Be Left Empty',
			  'error'
			);	*/			
		}else{
			var current_url  = window.location.href.toString();
			var splitted = current_url.split("#activities")[1].split("/");

			var last_check="";
			if(current_url.split("#activities")[1].split("/").length > 2){
				var last_spliter = current_url.split("#activities")[1].split("/")[2];
				 last_check = last_spliter.split("_")[3];				
			}
	//http://localhost/roundbobhelperv1/dist/#flights/(WNH) Wenshan Puzhehei Airport, Wensha/2017-11-24_2017-11-29_round_s		
	//http://localhost/roundbobhelperv1/dist/#flights/(BMN) Bamerny, Bamerny Iraq_(BGC) Braganca, Braganca Portugal_Economy/2017-11-22_2017-11-30_round_m/m
			console.log("uuuuuuu",last_check);
		if(last_check =="m" && current_url.split("#activities")[1].split("/").length > 2 ){
			
		}else if(current_url.split("#activities").length < 3)
			{
				 redirectTo = '/activities';
				//redirectTo += current_url.split("#flights")[1];
					redirectTo += '/'+splitted[1];
				  redirectTo += '/' + departure_date+"_"+return_date+"_"+travel_trip+"_s";
				 console.log("single_view",redirectTo);
				 //flights/www_ww_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0
				  app.router.go(redirectTo);
			}else{
			  redirectTo = '/activities';
				//redirectTo += current_url.split("#flights")[1].split("/")[0];
				
			  redirectTo += '/'+splitted[1];
			  redirectTo += '/' + departure_date+"_"+return_date+"_"+travel_trip+"_s";
			 console.log("single_view",redirectTo);
			 //flights/www_ww_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0
			  app.router.go(redirectTo);
			}
		  

		}
	},
  });

});
