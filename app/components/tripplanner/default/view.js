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
		'click .submit_planner_requests':'submit_planner_requests',
		'mouseover #travel_date' : 'departure_date',
		'mouseover #return_date' : 'return_date',
	},
	departure_date:function(e){
		var view = this;
		//console.log($(e.currentTarget));
		//$.noConflict();
		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:'2',
		  dateFormat: 'dd-mm-yy',
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
		
		var parts = document.getElementById("travel_date").value.split("-");
		var final_d_date=new Date(parts[2], parts[1] - 1, parts[0]);
		
		var ONE_DAY = 1000 * 60 * 60 * 24;
		var difference_ms = Math.abs(final_d_date.getTime() - value_t);
		var days =Math.round(difference_ms/ONE_DAY) + 2;
		console.log(parts+" date","final_d_date"+ final_d_date.getTime()+"value"+value_t+" days "+days);
		//console.log($(e.currentTarget));
		//$.noConflict();
		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:days,
		  dateFormat: 'dd-mm-yy',
		  defaultDate:that.selectedDate,
		  onSelect:function(dateText,datePicker) {
			console.log('onSelect',dateText);
			that.selectedDate = dateText;  
			//$("#departure-date").val("");
		  }
		});		
	},
	submit_planner_requests:function(){
		console.log("submited requests");
		
		var clients_name = document.getElementById("clients_name").value;
		var departure_place = document.getElementById("departure_place").value;
		var destination_place = document.getElementById("destination_place").value;
		var travel_date = document.getElementById("travel_date").value;
		var return_date = document.getElementById("return_date").value;
		var no_of_adults = document.getElementById("no_of_adults").value;
		var no_of_children = document.getElementById("no_of_children").value;
		var no_of_infants = document.getElementById("no_of_infants").value;
		var clients_phone_number = document.getElementById("clients_phone_number").value;
		var clients_email_address = document.getElementById("clients_email_address").value;
		var clients_additional_info = document.getElementById("clients_additional_info").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		console.log("clients_name "+clients_name+" departure_place "+destination_place+" travel_date "+travel_date+"no_of_adults"+no_of_adults);
		console.log("no_of_children "+no_of_children+" no_of_infants "+no_of_infants+" clients_phone_number "+clients_phone_number+"clients_email_address"+clients_email_address+"clients_additional_info"+clients_additional_info);
		var data = {};
			data.DepartureDate = travel_date;
			data.ReturnDate = return_date;
			data.OtherDetails = clients_additional_info;
			data.Departureplace = departure_place;
			data.Destinationplace = destination_place;
/*	{"Duration":"3","DepartureCountry":"Uganda","DestinationCountry":"Dubai","DepartureDate":"2016-12-13","NumberOfPeople":null,"OtherDetails":"1 adult","img":"","Location":""}*/
			
		if(clients_name === null || clients_name === undefined || clients_name === "" || clients_name.length < 5){
			swal(
			  'Empty',
			  ' Name Field Should not Be atleast 6 characters long',
			  'error'
			);			
		}else if(departure_place === null || departure_place === undefined || departure_place === "" || departure_place.length <3 ){
			swal(
			  'Empty',
			  ' Departure Field Should not Be atleast 3 characters long',
			  'error'
			);			
		}else if(destination_place === null || destination_place === undefined || destination_place === "" || destination_place.length <3 ){
			swal(
			  'Empty',
			  ' Destination Field Should not Be atleast 3 characters long',
			  'error'
			);			
		}else if(travel_date === null || travel_date === undefined || travel_date === ""){
			swal(
			  'Empty',
			  ' Travel Date Field Should not Be left Empty',
			  'error'
			);			
		}else if(return_date === null || return_date === undefined || return_date === "" ){
			swal(
			  'Empty',
			  ' Travel Date Field Should not Be left Empty',
			  'error'
			);			
		}else if(clients_phone_number === null || clients_phone_number === undefined || clients_phone_number === "" || clients_phone_number.length <10 ){
			swal(
			  'Empty',
			  ' Phone number Should not Be atleast 10 characters long',
			  'error'
			);			
		
		}else if(clients_email_address === null || clients_email_address === undefined || clients_email_address === ""|| clients_email_address.length <5 || !filter.test(clients_email_address) ){
			swal(
			  'Empty',
			  'Provide a valid email e.g bob@roundbob.com',
			  'error'
			);			
		}else{
			var jsonString= JSON.stringify(data);
			swal({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Submit!',
			  cancelButtonText: 'cancel!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false,
			}).then(function () {
				$.ajax({
					url: 'http://www.roundbob.com/public-api/custom-requests/add.json',
					type: 'POST',
					dataType: 'jsonp',
					//type: 'http://www.roundbob.com/public-api/custom-requests/add.json',
					data: jQuery.param({
						email: clients_email_address,
						phone : clients_phone_number,
						name : clients_name,
						request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						meta_data :jsonString,
						adults  :	no_of_adults,	
						children :	no_of_children,	
						infants :	no_of_infants,
        						
						//description  : "hello2"
						//price   : "hello2"
						//currency    : "hello2"
						//meta_data    : "hello2"
						//respond_via    : "hello2"[email, phone, whatsapp]
						//description  : "hello2",
						}) ,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					success: function (response) {
						console.log(response.status);
						swal(
						  'Sent',
						  'Your request has been sent!',
						  'success'
						);
					},
					error: function () {
						console.log("error");
						swal(
						  'Failed',
						  'Your request has not been sent!',
						  'error'
						);
					}
				});
			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  if (dismiss === 'cancel') {
				swal(
				  'Cancelled',
				  'Your imaginary file is safe :)',
				  'error'
				);
			  }
			});						
		}	
	},
  });

});
