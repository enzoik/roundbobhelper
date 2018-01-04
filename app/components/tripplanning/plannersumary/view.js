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
	 beforeRender: function() {
		console.log("xxxxxx"); 
	 },
	 afterRender: function(){
		 $("send_confirmation_id2").removeAttr('disabled');
		$('#go_backward_btn').show();
		$('#go_forward_btn').hide();
		
		/*retrieving information froom the url*/
		 var current_url  = window.location.href.toString();
		 var destination = current_url.split("#planner")[1].split("/")[1].split("-")[0];
		 var check_in_date = current_url.split("#planner")[1].split("/")[2].split("_")[0];
		 var check_out_date = current_url.split("#planner")[1].split("/")[2].split("_")[1];
		 var number_of_people ="";
		 var no_ = current_url.split("#planner")[1].split("/")[3];
		 var media = current_url.split("#planner")[1].split("/")[5];
		 var client_summary = current_url.split("#planner")[1].split("/")[9];
		var name=client_summary.split("_")[0];
		var email=client_summary.split("_")[1];
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		
		 if(no_ == "s"){
			  number_of_people = "people: 1 adults , 0 child, 0 infants";
		 }else if(no_ == "m"){
			adults = current_url.split("#planner")[1].split("/")[4].split("_")[1];
			child = current_url.split("#planner")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#planner")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adults+" adults , "+child+"child, "+infants+" infants";		 
		 }else if(media != "email"){
			 phone=client_summary.split("_")[1];
		 }
		 console.log("destination "+destination+" check_in_date "+check_in_date+" check_out_date "+ check_out_date+" number_of_people "+number_of_people);
		// $('#check_in_date').text(check_in_date);
		 $('#check_in_date').html('<span><i class="icon-calendar"></i>'+ check_in_date.replace(/%20/g,'')+'</i></span>');
		 $('#check_out_date').html('<span><i class="icon-calendar"></i>'+ check_out_date.replace(/%20/g,'')+'</i></span>');
		 $('#destination').text(destination.replace(/%20/g,''));
		 $('#no_of_people').text(number_of_people.replace(/%20/g,''));
	 },
	 
	 
	events:{
		'click .send_confirmed_request_planner' : 'send_confirmed_request',
	},
	
	
	send_confirmed_request:function(){
		console.log("send details");
		var current_url  = window.location.href.toString();
		var redirectTo = '';
		$("#send_confirmation_id2").attr("disabled","disabled");
		var destination = current_url.split("#planner")[1].split("/")[1].split("-")[0];
		 var check_in_date = current_url.split("#planner")[1].split("/")[2].split("_")[0];
		 var check_out_date = current_url.split("#planner")[1].split("/")[2].split("_")[1];
		 var number_of_people ="";
		 var no_ = current_url.split("#planner")[1].split("/")[3];
		 var divisar =current_url.split("#planner")[1].split("/");
		 
		 var media = current_url.split("#planner")[1].split("/")[divisar.length -1].split("_")[2];
		 var client_summary = current_url.split("#planner")[1].split("/")[9];
		var name=client_summary.split("_")[0];
		var email="";
		var notification_summary="";
		var get_response_via="";
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		var data_info = {};
		//http://localhost/roundbobhelperv1/dist/#picklocation/Johannesburg, GT, South Africa/22-11-2017_30-11-2017_s/s/single/email/sdng_mail/p234/sent_to/patrick_patrickkanyerezi@gmail.com_email
		data_info.CheckInDate = escape(check_in_date).replace(/%20/g,'');
		data_info.CheckOutDate = escape(check_out_date).replace(/%20/g,'');
		data_info.Destination = escape(destination).replace(/%20/g,'');
		//console.log("media",current_url.split("#picklocation")[1].split("/")[divisar.length -1].split("_")[1]);
		 console.log("media",media+"="+current_url.split("#planner")[1].split("/")[divisar.length -1].split("_")[1]);
		 console.log("length",media+"="+current_url.split("#planner")[1].split("/")[divisar.length -1].split("_")[2].length);
		 if(no_ == "s"){
			  number_of_people = "people: 1 adults , 0 child, 0 infants";
		 }else if(no_ == "m"){
			adults = current_url.split("#planner")[1].split("/")[4].split("_")[1];
			child = current_url.split("#planner")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#planner")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adults+" adults , "+child+"child, "+infants+" infants";		 
		 }
		 if(media === "email"){
			 email=current_url.split("#planner")[1].split("/")[divisar.length -1].split("_")[1];
			 console.log("media",email);
			get_response_via="email";	
			notification_summary="You will get response via your Email "+	email +" after request submission";
		 }else if(media === "watsapp"){
			get_response_via="watsapp";
			 phone=current_url.split("#planner")[1].split("/")[divisar.length -1].split("_")[1];	
			notification_summary="You will get response via your watsapp number "+	watsapp_no +" after request submission";	
		}else if(media === "call"){
			get_response_via="phone";
			 phone=current_url.split("#planner")[1].split("/")[divisar.length -1].split("_")[1];	
			notification_summary="You will receive a call on your phone number "+	phone +" after request submission";		
		}	
		 var jsonString= JSON.stringify(data_info);
		 console.log("media","email"+email+"phone"+phone+"name"+name+"adults"+adults+"child"+child);
		 console.log("media",get_response_via);
		 console.log("media",jsonString);

			swal({
			  title: 'confirmation',
			  text: ""+notification_summary,
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Submit!',
			  cancelButtonText: 'cancel!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false
			}).then(function () {
				$("#send_confirmation_id2").attr("disabled","disabled");
				$.ajax({
					url: '//customrequests.roundbob.com/public-api/custom-requests/add.json',
					headers: { "Accept-Encoding" : "gzip" },
					type: 'POST',
					dataType: 'json',//be sure you are receiving a valid json response or you'll get an error
					data: jQuery.param({
						email: email,
						phone : phone,
						name : escape(name).replace(/%20/g,''),
						request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						adults : escape(adults),
						children : escape(child),
						infants : escape(infants),
						respond_via    : get_response_via,
						meta_data :jsonString,
						}) ,
				})
				.done(function(response) {
					console.log("success");
					console.log(response);
							swal({
							  position: 'center',
							  type: 'success',
							  title: 'Your Request has been sent successfully',
							  showConfirmButton: false,
							  timer: 1500
							});
				})
				.fail(function() {
						console.log("error");
						/*swal(
						  'Failed',
						  'Your request has not been sent!',
						  'error'
						);*/
				})
				.always(function() {
					$('#progress_metre_id').html('<svg height="10" width="100%" style="background:#ccc;"><line x1="0" y1="0" x2="100%" y2="0" style="stroke:#e7e874;stroke-width:20" />  </svg><span class="centage-label">100%</span>');
					
					console.log("complete");
							swal({
							  position: 'center',
							  type: 'success',
							  title: 'Your Request has been sent successfully',
							  showConfirmButton: false,
							  timer: 1500
							});
					app.router.go(redirectTo);
				});
				/*$.ajax({
					url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					type: 'POST',
					dataType: 'jsonp',
					//type: 'http://www.roundbob.com/public-api/custom-requests/add.json',
					data: jQuery.param({
						email: escape(email).replace(/%20/g,''),
						phone : escape(phone).replace(/%20/g,''),
						name : escape(name).replace(/%20/g,''),
						request_type : "FLIGHT", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						adults : escape(adults),
						children : escape(child),
						infants : escape(infants),
						respond_via    : get_response_via,
						meta_data :jsonString,
						}) ,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					success: function (response) {
						console.log(response.status);
							swal({
							  position: 'center',
							  type: 'success',
							  title: 'Your custom Request has been sent successfully',
							  showConfirmButton: false,
							  timer: 1500
							});
					},
					error: function () {
							swal({
							  position: 'center',
							  type: 'error',
							  title: 'An error occured while sbmitting your custom request',
							  showConfirmButton: false,
							  timer: 1500
							});
							$("send_confirmation_id2").removeAttr('disabled');
					}
				});*/
			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  $("send_confirmation_id2").removeAttr('disabled');
			  if (dismiss === 'cancel') {
					$("send_confirmation_id2").removeAttr('disabled');
			  }
			});	

	/*	var coming_from = current_url.split("#flights")[1].split("/")[1].split("_")[0];
		var going_to = current_url.split("#flights")[1].split("/")[1].split("_")[1];
		var flight_class = current_url.split("#flights")[1].split("/")[1].split("_")[2];
		var departure_date = current_url.split("#flights")[1].split("/")[2].split("_")[0];
		//var return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		var dates_details = current_url.split("#flights")[1].split("/")[2].split("_");
		var flight_type = dates_details[dates_details.length - 1];
		var no_ = current_url.split("#flights")[1].split("/")[3];
		var media = current_url.split("#flights")[1].split("/")[9].split("_")[2];
		var name="";
		var email="";
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		var data = {};
		data.DepartureDate = departure_date;
		data.DeparturePlace = coming_from;
		data.DestinationPlace = coming_from;
		//var no_ = current_url.split("#flights")[1].split("/")[1].split("_")[3];
		
		
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
	
		if(no_ == "s"){
			
		}else if(flight_type == "round"){
			data.ReturnDate = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		}else if(no_ == "m"){
			adults = current_url.split("#flights")[1].split("/")[4].split("_")[1];
			child = current_url.split("#flights")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#flights")[1].split("/")[4].split("_")[5];
		}else if(media == "email"){
			console.log("memem");
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1];			
		}else if(media == "call"){
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1];			
		}
		var jsonString= JSON.stringify(data);
		console.log(current_url.split("#flights")[1].split("/")[9]);
		console.log("media","media "+media+" name "+current_url.split("#flights")[1].split("/")[9].split("_")[0]+" email "+email+" phone "+ phone);
		//console.log(jsonString);

		$.ajax({
			url: 'http://www.roundbob.com/public-api/custom-requests/add.jso',
			type: 'POST',
			dataType: 'jsonp',
			//type: 'http://www.roundbob.com/public-api/custom-requests/add.json',
			data: jQuery.param({
				email: email,
				phone : phone,
				name : name,
				request_type : "FLIGHT", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
				adults : adults,
				children : child,
				infants : infants,
				//description  : "hello2"
				//price   : "hello2"
				//currency    : "hello2"
				//meta_data    : "hello2"
				//respond_via    : "hello2"[email, phone, whatsapp]
				meta_data :jsonString,
				}) ,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function (response) {
				console.log(response.status);
			},
			error: function () {
				console.log("error");
			}
		}); */		


	
	},
  });

});
