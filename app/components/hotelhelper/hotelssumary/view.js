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
		 var current_url  = window.location.href.toString();
		 //http://localhost/roundbobhelperv1/dist/#picklocation/kkkk/28-10-2017_31-10-2017_s/s/single/email/sdng_mail/p234/sent_to/patrick_patrick@gmail.com_email
		 //http://localhost/roundbobhelperv1/dist/#picklocation/dubai/27-10-2017_30-10-2017_m/m/adlts_1_chldn_0_rooms_1/email/m_mail/m_client/m_summary/ppp_patric@gmail.com_email
		 var destination = current_url.split("#picklocation")[1].split("/")[1];
		 var check_in_date = current_url.split("#picklocation")[1].split("/")[2].split("_")[0];
		 var check_out_date = current_url.split("#picklocation")[1].split("/")[2].split("_")[1];
		 var number_of_people ="";
		 var no_ = current_url.split("#picklocation")[1].split("/")[3];
		 var media = current_url.split("#picklocation")[1].split("/")[5];
		 var client_summary = current_url.split("#picklocation")[1].split("/")[9];
		var name=client_summary.split("_")[0];
		var email=client_summary.split("_")[1];
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		 if(no_ == "s"){
			  number_of_people = "people: 1 adults , 0 child, 0 infants";
		 }else if(no_ == "m"){
			adults = current_url.split("#picklocation")[1].split("/")[4].split("_")[1];
			child = current_url.split("#picklocation")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#picklocation")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adults+" adults , "+child+"child, "+infants+" infants";		 
		 }else if(media != "email"){
			 phone=client_summary.split("_")[1];
		 }
		 
	 },
	events:{
		'click .send_confirmed_request' : 'send_confirmed_request',
	},
	send_confirmed_request:function(){
		console.log("send details");
		var current_url  = window.location.href.toString();
		
		//kampala_dubai_Economy/26-10-2017_31-10-2017_round_s/s/single/email/sdng_mail/p234/sent_to/patrick_p@gmail.com_email
		//http://localhost/roundbobhelperv1/dist/#flights/kampala_dubai_Economy/26-10-2017_31-10-2017_round_s/s/single/email/sdng_mail/p234/sent_to/patrick_p@gmail.com_email
		//http://localhost/roundbobhelperv1/dist/#flights/kkk_jjjj_Economy/27-10-2017_31-10-2017_round_m/m/adlts_1_chldn_0_infnts_0/call/true_/m_mail/m_client/patrick_256702458965_call
		//http://localhost/roundbobhelperv1/dist/#flights/kam_dub_Economy/26-10-2017__oneway_s/s/single/email/sdng_mail/p234/sent_to/patrick_patrick@gmail.com_email
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
