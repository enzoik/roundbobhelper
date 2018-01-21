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
	/*afterRender : function() {
		$('#go_backward_btn').show();
		$('#go_forward_btn').show();

	},
		afterRender : function() {
		$('#selected_to').hide();
		$('#selected').hide();


	}*/
    afterRender: function(){
		$('#go_backward_btn').show();
		$('#go_forward_btn').hide();
		$("send_confirmation_id").removeAttr('disabled');
		//http://localhost/roundbobhelperv1/dist/#surprise/5900169_Christmas%20Holiday_1_Uganda/2017-12-13_2017-12-26_round_s_%203%20nights%20Mirembe%20Resort%20Beach%20Christmas%20special%20package
		//_5899d4ed-5e44-4fd4-91d4-1b1089ac00e9_090569001486476525-20170207050845-1486476525/s/single/email/sdng_mail/p234/sent_to/patrick_patrickkanyerezi@gmail.com_email
		//http://localhost/roundbobhelperv1/dist/#surprise/4_City%20getaway_1_Uganda/2017-12-13_2017-12-26_round_m_2%20Nights%20Fort%20portal%20weekend%20getaway%20package_590058dd-7e10-49ef-9070-0d1c89ac00e9_900018001493194973-20170426112253-1493194974/m/adlts_1_chldn_1_infnts_1
		var current_url  = window.location.href.toString();
		var category = current_url.split("#activities")[1].split("/")[1].split("_")[1];
		var country = current_url.split("#activities")[1].split("/")[1].split("_")[3];
		var departure_date = current_url.split("#activities")[1].split("/")[2].split("_")[0];
		var return_date = current_url.split("#activities")[1].split("/")[2].split("_")[1];
		var no_ = current_url.split("#activities")[1].split("/")[2].split("_")[3];
		var package_info = current_url.split("#activities")[1].split("/")[2].split("_")[4];
		var did = current_url.split("#activities")[1].split("/")[2].split("_")[5];
		var media = current_url.split("#activities")[1].split("/")[9].split("_")[2];
		var number_of_people ="";
		var adult="1";
		var child="0";
		var infants="0";
		//var name="";
		//var phone="";
		//var email="";
		
		var	phone=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[0];
		var email=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[1];
		var name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
		
		$('#info_details').text(name+" , "+email+" , "+phone);
		if(no_ == "s"){
			 number_of_people = "people: 1 adults , 0 child, 0 infants";
		}else if(no_ == "m"){
			adult = current_url.split("#activities")[1].split("/")[4].split("_")[1];
			child = current_url.split("#activities")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#activities")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adult+" adults , "+child+"child, "+infants+" infants";
		}
		
		if(media == "watsapp"){
			 name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[0];		
		}else if(media == "email"){
			 name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[1];	
		}else if(media == "call"){
			 name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[0];		
		}
		console.log("phone",phone+email);
		
		// $('#info_details').text(escape(package_info).replace(/%20/g,' '));
		 $('#departure_date_id').html('<span><i class="icon-calendar"></i>'+ escape(departure_date).replace(/%20/g,'') +'</i></span>');
		 $('#return_date_id').html('<span><i class="icon-calendar"></i>'+ escape(return_date).replace(/%20/g,'') +'</i></span>');
		 
		 $('#departure_place_id').text(escape(country).replace(/%20/g,''));
		 $('#departure_place_id2').text(escape(category).replace(/%20/g,''));
		 $('#destination_id').text(escape(category).replace(/%20/g,''));
		 $('#destination_id2').text(escape(country).replace(/%20/g,''));
		 $('#no_of_people').text(number_of_people);
   },
	 beforeRender: function() {
		console.log("xxxxxx"); 

	 },
	events:{
		'click .send_confirmed_requestactivity' : 'send_confirmed_request',
	},
	send_confirmed_request:function(el){
		console.log("send details");
		 $("#send_confirmation_id").attr("disabled","disabled");
		 var redirectTo = '';
		var other_details_id = document.getElementById("other_details_id").value;
		var current_url  = window.location.href.toString();
		var departure_date = current_url.split("#activities")[1].split("/")[2].split("_")[0];
		var return_date = current_url.split("#activities")[1].split("/")[2].split("_")[1];
		var no_ = current_url.split("#activities")[1].split("/")[2].split("_")[3];
		var package_info = current_url.split("#activities")[1].split("/")[2].split("_")[4];
		var did = current_url.split("#activities")[1].split("/")[2].split("_")[5];
		var media = current_url.split("#activities")[1].split("/")[9].split("_")[2];
		var notification_summary ="";
		var get_response_via ="";
		var number_of_people ="";
		var adults="1";
		var child="0";
		var infants="0";
		var name="";
		var phone="";
		var email="";
		var data_info = {};
		data_info.DepartureDate = escape(departure_date).replace(/%20/g,'');
		data_info.ReturnDate = escape(return_date).replace(/%20/g,'');
		data_info.PackageInfo = escape(package_info).replace(/%20/g,'');
		data_info.OtherDetails = other_details_id;
		
		
		/*if there r multiple people traveling*/
		if(no_ == "s"){
			
		}else if(no_ == "m"){
			adults = current_url.split("#activities")[1].split("/")[4].split("_")[1];
			child = current_url.split("#activities")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#activities")[1].split("/")[4].split("_")[5];
		}
		if(media == "watsapp"){
			console.log("memem");
			get_response_via="watsapp";
			 name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[0];		
			 phone=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[1];		
			notification_summary="You will get response via your watsapp number "+	watsapp_no +"after request submission";	
		}else if(media == "email"){
			console.log("memem");
			get_response_via="email";
			 name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[0];		
			 phone=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[1];	
			notification_summary="You will get response via your Email "+	email +"after request submission";
		}else if(media == "call"){
			get_response_via="phone";
			 name=current_url.split("#activities")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[0];		
			 phone=current_url.split("#activities")[1].split("/")[9].split("_")[1].split("-")[1];		
			notification_summary="You will receive a call on your phone number "+	phone +"after request submission";		
		}
		var jsonString= JSON.stringify(data_info);
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
					dataType: 'json',//be sure you are receiving a valid json response or you'll get an error
					data: jQuery.param({
						email: escape(email).replace(/%20/g,''),
						phone : escape(phone).replace(/%20/g,'') ,
						name :  escape(name).replace(/%20/g,''),
						request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
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
