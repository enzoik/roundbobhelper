define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Config = {
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
	/*Setting up things on the summary view to be viewed by a client before submitting*/
    afterRender: function(){
		$('#go_backward_btn').show();
		$('#go_forward_btn').hide();
		$("send_confirmation_id").removeAttr('disabled');
		var current_url  = window.location.href.toString();
		var other_details = document.getElementById("other_details").value;
		var coming_from = current_url.split("#flights")[1].split("/")[1].split("_")[0];
		var going_to = current_url.split("#flights")[1].split("/")[1].split("_")[1];
		var flight_class = current_url.split("#flights")[1].split("/")[1].split("_")[2];
		var departure_date = current_url.split("#flights")[1].split("/")[2].split("_")[0];
		var return_date = "";
		var dates_details = current_url.split("#flights")[1].split("/")[2].split("_");
		var flight_type = dates_details[dates_details.length - 2];
		var no_ = current_url.split("#flights")[1].split("/")[3];
		var media = current_url.split("#flights")[1].split("/")[9].split("_")[2];
		var notification_summary="";
		var get_response_via="";
		var name="";
		var email="";
		var watsapp_no="";
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		var parent_data ={};
		var data_info = {};
		var number_of_people="";
		data_info.DepartureDate = escape(departure_date).replace(/%20/g,'');
		data_info.DeparturePlace = escape(coming_from).replace(/%20/g,'');
		data_info.DestinationPlace = escape(coming_from).replace(/%20/g,'');
		data_info.OtherDetails = escape(other_details).replace(/%20/g,'');

		
		
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		/*if there r multiple people traveling*/
		if(no_ == "s"){
			 number_of_people = "People: 1 Adults , 0 Child, 0 Infants";
		}else if(no_ == "m"){
			adults = current_url.split("#flights")[1].split("/")[4].split("_")[1];
			child = current_url.split("#flights")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#flights")[1].split("/")[4].split("_")[5];
		}
		
		if(flight_type == "round"){
			//data_info.ReturnDate = current_url.split("#flights")[1].split("/")[2].split("_")[1];
			return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		}
		if(media == "watsapp"){
			console.log("memem");
			get_response_via="watsapp";
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[1];		
			notification_summary="You will get response via your watsapp number "+	watsapp_no +" after request submission";	
		}else if(media == "email"){
			console.log("memem");
			get_response_via="email";
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[0];	
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[1];		
			notification_summary="You will get response via your Email "+	email +" after request submission";
		}else if(media == "call"){
			get_response_via="phone";
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[1];	
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[0];	
			notification_summary="You will receive a call on your phone number "+	phone +" after request submission";		
		}

		console.log("return_date "+return_date+" departure_date"+ departure_date +"flight_type"+flight_type);
		 $('#flight_type').text(escape(flight_type).replace(/%20/g,''));
		 $('#departure_date_id').html('<span><i class="icon-calendar"></i>'+ escape(departure_date).replace(/%20/g,'') +'</i></span>');
		 
		 $('#departure_place_id').text(escape(coming_from).replace(/%20/g,''));
		 $('#departure_place_id2').text(escape(going_to).replace(/%20/g,''));
		 $('#destination_id').text(escape(going_to).replace(/%20/g,''));
		 $('#destination_id2').text(escape(coming_from).replace(/%20/g,''));
		 $('#no_of_people').text(number_of_people);
		 
		 $('#clientName1').text(name.replace(/%20/g,''));
		 $('#clientEmail1').text("Email - "+email.replace(/%20/g,''));
		 $('#clientPhone1').text("Phone - "+phone.replace(/%20/g,''));
		 //patrickkanyerezi@gmail.com-256701203975
		 console.log("details",current_url.split("#flights")[1].split("/")[9].split("_")[1]);
		 console.log("details",email);
		 console.log("details",media);
   },
	 beforeRender: function() {
		console.log("xxxxxx"); 

	 },
	events:{
		'click .send_confirmed_request_flights' : 'send_confirmed_request',
	},
	send_confirmed_request:function(el){
		console.log("send details");
		 $("#send_confirmation_id").attr("disabled","disabled");
		 var redirectTo = '';
		var current_url  = window.location.href.toString();
		var other_details = document.getElementById("other_details").value;
		var coming_from = current_url.split("#flights")[1].split("/")[1].split("_")[0];
		var going_to = current_url.split("#flights")[1].split("/")[1].split("_")[1];
		var flight_class = current_url.split("#flights")[1].split("/")[1].split("_")[2];
		var departure_date = current_url.split("#flights")[1].split("/")[2].split("_")[0];
		//var return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		var dates_details = current_url.split("#flights")[1].split("/")[2].split("_");
		var flight_type = dates_details[dates_details.length - 2];
		var no_ = current_url.split("#flights")[1].split("/")[3];
		var media = current_url.split("#flights")[1].split("/")[9].split("_")[2];
		var notification_summary="";
		var get_response_via="";
		var name="";
		var email="";
		var watsapp_no="";
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		var parent_data ={};
		var data_info = {};
		data_info.DepartureDate = escape(departure_date).replace(/%20/g,'');
		data_info.DeparturePlace = escape(coming_from).replace(/%20/g,'');
		data_info.DestinationPlace = escape(coming_from).replace(/%20/g,'');
		data_info.OtherDetails = escape(other_details).replace(/%20/g,'');

		
		
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		/*if there r multiple people traveling*/
		if(no_ == "s"){
			
		}else if(no_ == "m"){
			adults = current_url.split("#flights")[1].split("/")[4].split("_")[1];
			child = current_url.split("#flights")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#flights")[1].split("/")[4].split("_")[5];
		}
		
		if(flight_type == "round"){
			data_info.ReturnDate = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		}
		if(media == "watsapp"){
			console.log("memem");
			get_response_via="watsapp";
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[1];		
			notification_summary="You will get response via your watsapp number "+	watsapp_no +" after request submission";	
		}else if(media == "email"){
			console.log("memem");
			get_response_via="email";
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[0];	
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[1];		
			notification_summary="You will get response via your Email "+	email +" after request submission";
		}else if(media == "call"){
			get_response_via="phone";
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[1];	
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1].split("-")[0];	
			notification_summary="You will receive a call on your phone number "+	phone +" after request submission";		
		}
		var jsonString= JSON.stringify(data_info);
		/*parent_data.email =escape(email).replace(/%20/g,'');
		parent_data.phone =escape(phone).replace(/%20/g,'') ;
		parent_data.name =escape(name).replace(/%20/g,'') ;
		parent_data.request_type = "FLIGHT";
		parent_data.adults = adults;
		parent_data.children = child;
		parent_data.infants = infants;
		parent_data.respond_via = get_response_via;
		parent_data.meta_data = jsonString;
		var jsondata= JSON.stringify(parent_data);
		console.log(current_url.split("#flights")[1].split("/")[9]);
		console.log("adults", current_url.split("#flights")[1].split("/")[4].split("_")[1]);
		console.log("media","media "+media+" name "+current_url.split("#flights")[1].split("/")[9].split("_")[0]+" email "+email+" phone "+ phone+"adults"+adults+"children"+child+"infants"+infants);
		console.log("media",jsonString);
		console.log("media",get_response_via);*/
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
				$("#send_confirmation_id").attr("disabled","disabled");
				$.ajax({
					//url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					url: '//beta.roundbob.com/public/api/v1/custom-requests/add.json',
					headers: { "Accept-Encoding" : "gzip" },
					type: 'POST',
					dataType: 'jsonp',//be sure you are receiving a valid json response or you'll get an error
					data: jQuery.param({
						email: escape(email).replace(/%20/g,''),
						phone : escape(phone).replace(/%20/g,'') ,
						name :  escape(name).replace(/%20/g,''),
						request_type : "FLIGHT", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						adults : adults,
						children : child,
						infants : infants,
						respond_via    : get_response_via,
						meta_data :jsonString,
						}) ,
				})
				.done(function(response) {
					console.log("success");
					console.log(response);
					if(response.responseStatus.status){
						swal({
						  position: 'center',
						  type: 'success',
						  title: 'Your Request has been sent successfully',
						  showConfirmButton: false,
						  timer: 1500
						});

						app.router.go(redirectTo);						
					}else{
						swal({
						  position: 'center',
						  type: 'error',
						  title: ''+response.responseStatus.message,
						  showConfirmButton: false,
						  timer: 2500
						});		
						$("#send_confirmation_id").removeAttr('disabled');						
					}
						/*	swal({
							  position: 'center',
							  type: 'success',
							  title: 'Your Request has been sent successfully',
							  showConfirmButton: false,
							  timer: 1500
							});*/
				})
				.fail(function() {
						console.log("error");
						$("#send_confirmation_id").removeAttr('disabled');
					$('#progress_metre_id').html('<svg height="10" width="100%" style="background:#ccc;"><line x1="0" y1="0" x2="100%" y2="0" style="stroke:#e7e874;stroke-width:20" />  </svg><span class="centage-label">100%</span>');
					
					console.log("complete");
							swal({
							  position: 'center',
							  type: 'error',
							  title: 'Check your internet connection and try again',
							  showConfirmButton: false,
							  timer: 1500
							});
				})
				.always(function() {
					/*$('#progress_metre_id').html('<svg height="10" width="100%" style="background:#ccc;"><line x1="0" y1="0" x2="100%" y2="0" style="stroke:#e7e874;stroke-width:20" />  </svg><span class="centage-label">100%</span>');
					
					console.log("complete");
							swal({
							  position: 'center',
							  type: 'success',
							  title: 'Your Request has been sent successfully',
							  showConfirmButton: false,
							  timer: 1500
							});
					app.router.go(redirectTo);*/
				});

			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  $("send_confirmation_id").removeAttr('disabled');
			  if (dismiss === 'cancel') {
					$("send_confirmation_id").removeAttr('disabled');
			  }
			});	
		

	
	},
  });

});
