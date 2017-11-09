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
	//$("submit_activity_details").removeAttr('disabled');
	afterRender: function(){
		 $("submit_activity_details").removeAttr('disabled');
		$('#go_backward_btn').show();
		$('#go_forward_btn').show();
	},
	events:{
		'click .submit_request':'submit_request',
		'mouseover #travel_date':'ontravel_date',
		'keydown #destination_d': 'citysearchfield_d'
	},
	citysearchfield_d:function(el){
		console.log("test");
	 jQuery.noConflict();
	 $("#destination_d").autocomplete({
		source: function (request, response) {
		 $.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+document.getElementById('destination_d').value,
			function (data) {
			//	console.log("data",data);
			 response(data);
			 
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 $("#destination_d").val(selectedObj.value);
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
	 $("#destination_d").autocomplete("option", "delay", 100);		
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
			  ' Additional request Field Should not Be atleast 6 characters long',
			  'error'
			);			
		}else if(category_id === null || category_id === undefined || category_id === "" || category_id.length <3 ){
			swal(
			  'Empty',
			  ' Select a category to proceed',
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
			$("#submit_activity_details").attr("disabled","disabled");
			var notification_summary="You will get response via "+	clients_email_address +" after request submission";
			var jsonString= JSON.stringify(data);
			swal({
			  title: 'Confirmation',
			  text: notification_summary,
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
				console.log("clients_email_address"+clients_email_address+"clients_phone_number"+clients_phone_number+"jsonString"+jsonString);
				$.ajax({
					url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					headers: { "Accept-Encoding" : "gzip" },
					type: 'POST',
					dataType: 'json',//be sure you are receiving a valid json response or you'll get an error
					data: jQuery.param({
						email: clients_email_address,
						phone : clients_phone_number,
						//name : name,
						request_type : "ACTIVITY", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						meta_data :jsonString,
						}) ,
				})
				.done(function(response) {
					console.log("success");
					console.log(response);
					/*	swal(
						  'Sent',
						  'Your request has been sent!',
						  'success'
						);
					$('#addtitional_request_id').text("");
					$('#category_id').text("");
					$('#destination_d').text("");
					$('#travel_date').text("");
					$('#clients_phone_number').text("");
					$('#clients_email_address').text("");
					$('#clients_additional_info').text("");*/
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
					swal({
					  position: 'center',
					  type: 'success',
					  title: 'Your Request has been sent successfully',
					  showConfirmButton: false,
					  timer: 1500
					});

				});
				var redirectTo = '/specialoffer/successpage';
			   app.router.go(redirectTo);
				/*$.ajax({
					url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					  traditional: true,
						method: "POST",
					dataType: 'jsonp',
					data: jQuery.param({
						email: clients_email_address,
						phone : clients_phone_number,
						//name : name,
						request_type : "ACTIVITY", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						meta_data :jsonString,
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
						$("submit_activity_details").removeAttr('disabled');
						console.log("error");
						swal(
						  'Failed',
						  'Your request has not been sent!',
						  'error'
						);
					}
				});*/
			}, function (dismiss) {
			  if (dismiss === 'cancel') {
				  $("submit_activity_details").removeAttr('disabled');
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
