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
	afterRender: function(){
		 $("submit_trip_details_id").removeAttr('disabled');
		$('#go_backward_btn').show();
		$('#go_forward_btn').hide();
	},
	events:{
		'click .submit_planner_requests':'submit_planner_requests',
		'mouseover #travel_date' : 'departure_date',
		'mouseover #return_date' : 'return_date',
		'keydown #destination_place': 'destination_place',
		'keydown #departure_place': 'departure_place',
	},
	departure_place:function(){
		console.log("test");
	 jQuery.noConflict();
	 $("#departure_place").autocomplete({
		source: function (request, response) {
		 $.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+document.getElementById('departure_place').value,
			function (data) {
			//	console.log("data",data);
			 response(data);
			 
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 $("#departure_place").val(selectedObj.value);
		//getcitydetails(selectedObj.value);
		 return false;
		},
		open: function () {
		 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 $("#departure_place").autocomplete("option", "delay", 100);		
	},
	destination_place:function(){
		console.log("test");
	 jQuery.noConflict();
	 $("#destination_place").autocomplete({
		source: function (request, response) {
		 $.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+document.getElementById('destination_place').value,
			function (data) {
			//	console.log("data",data);
			 response(data);
			 
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 $("#destination_place").val(selectedObj.value);
		//getcitydetails(selectedObj.value);
		 return false;
		},
		open: function () {
		 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 $("#destination_place").autocomplete("option", "delay", 100);		
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
		$("#submit_trip_details_id").attr("disabled","disabled");		
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
			
		if(clients_name === null || clients_name === undefined || clients_name === "" || clients_name.length < 3){
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
			var notification_summary="You will get response via "+	clients_email_address +"and "+clients_phone_number+" after request submission";
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
					url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					headers: { "Accept-Encoding" : "gzip" },
					type: 'POST',
					dataType: 'json',//be sure you are receiving a valid json response or you'll get an error
					data: jQuery.param({
						email: clients_email_address,
						phone : clients_phone_number,
						name : clients_name,
						request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						meta_data :jsonString,
						adults  :	no_of_adults,	
						children :	no_of_children,	
						infants :	no_of_infants,
						}) ,
				})
				.done(function(response) {
					console.log("success");
					console.log(response);
						swal(
						  'Sent',
						  'Your request has been sent!',
						  'success'
						);
				})
				.fail(function() {
					console.log("error");
						$("submit_activity_details").removeAttr('disabled');
						console.log("error");
						swal(
						  'Failed',
						  'Your request has not been sent!',
						  'error'
						);
				})
				.always(function() {
					console.log("complete");
				});
				var redirectTo = '/tripplanner/successpage';
			   app.router.go(redirectTo);
			/*	$.ajax({
					url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					type: 'POST',
					dataType: 'jsonp',
					data: jQuery.param({
						email: clients_email_address,
						phone : clients_phone_number,
						name : clients_name,
						request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						meta_data :jsonString,
						adults  :	no_of_adults,	
						children :	no_of_children,	
						infants :	no_of_infants,
        						
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
						$("submit_trip_details_id").removeAttr('disabled');
						swal(
						  'Failed',
						  'Your request has not been sent!',
						  'error'
						);
					}
				});*/
			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  if (dismiss === 'cancel') {
				  $("submit_trip_details_id").removeAttr('disabled');
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
