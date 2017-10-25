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
		'click .submit_request':'submit_request',
		'mouseover #travel_date':'ontravel_date'
	},
	ontravel_date: function(e){
		var view = this;
		//console.log($(e.currentTarget));
		//$.noConflict();
		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:2,
		  dateFormat: 'dd-mm-yy',
		  defaultDate:view.selectedDate,
		  onSelect:function(dateText,datePicker) {
			console.log('onSelect',dateText);
			view.selectedDate = dateText;  
			//$("#departure-date").val("");
		  }
		});	
	},
	submit_request: function(){
		var addtitional_request_id = document.getElementById("addtitional_request_id").value;
		var category_id = document.getElementById("category_id").value;
		var destination_d = document.getElementById("destination_d").value;
		var travel_date = document.getElementById("travel_date").value;
		/*var return_date = document.getElementById("departure_date").value;
		var no_of_adults = document.getElementById("no_of_adults").value;
		var no_of_children = document.getElementById("no_of_children").value;
		var no_of_infants = document.getElementById("no_of_infants").value;*/
		var clients_phone_number = document.getElementById("clients_phone_number").value;
		var clients_email_address = document.getElementById("clients_email_address").value;
		var clients_additional_info = document.getElementById("clients_additional_info").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var data = {};
			data.AdditionalRequest = addtitional_request_id;
			data.PackageCategory = category_id;
			data.Destination = destination_d;
			data.DepartureDate = travel_date;
			data.OtherDetails = clients_additional_info;
		//console.log("clients_name "+clients_name+" departure_place "+destination_place+" travel_date "+departure_date+"no_of_adults"+no_of_adults);
		//console.log("no_of_children "+no_of_children+" no_of_infants "+no_of_infants+" clients_phone_number "+clients_phone_number+"clients_email_address"+clients_email_address+"clients_additional_info"+clients_additional_info);
/*	{"Duration":"3","DepartureCountry":"Uganda","DestinationCountry":"Dubai","DepartureDate":"2016-12-13","NumberOfPeople":null,"OtherDetails":"1 adult","img":"","Location":""}*/
		
		if(addtitional_request_id === null || addtitional_request_id === undefined || addtitional_request_id === "" || addtitional_request_id.length < 5){
			swal(
			  'Empty',
			  ' Name Field Should not Be atleast 6 characters long',
			  'error'
			);			
		}else if(category_id === null || category_id === undefined || category_id === "" || category_id.length <3 ){
			swal(
			  'Empty',
			  ' Departure Field Should not Be atleast 3 characters long',
			  'error'
			);			
		}else if(destination_d === null || destination_d === undefined || destination_d === "" || destination_d.length <3 ){
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
						//name : name,
						request_type : "ACTIVITY", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						meta_data :jsonString,
						
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
