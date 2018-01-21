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
		var current_url  = window.location.href.toString();
		var coming_from = current_url.split("#flights")[1].split("/")[1].split("_")[0];
		var going_to = current_url.split("#flights")[1].split("/")[1].split("_")[1];
		var flight_class = current_url.split("#flights")[1].split("/")[1].split("_")[2];
		var departure_date = current_url.split("#flights")[1].split("/")[2].split("_")[0];
		//var return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		var return_date = "";
		var dates_details = current_url.split("#flights")[1].split("/")[2].split("_");
		var flight_type = dates_details[dates_details.length-2];
		var no_ = current_url.split("#flights")[1].split("/")[3];
		var media = current_url.split("#flights")[1].split("/")[9].split("_")[2];
			console.log("userdetails","coming_from "+coming_from+ " going_to "+going_to+" flight_class "+flight_class+" departure_date "+departure_date+" dates_details "+dates_details+"flight_type"+flight_type);
		var name="";
		var email="";
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		var number_of_people ="";
		/*var flight_type_id = document.getElementById("flight_type").innerText;
		var departure_date_id = document.getElementById("departure_date_id").innerText;
		var departure_place_id = document.getElementById("departure_place_id").innerText;
		var destination_id = document.getElementById("destination_id").innerText;
		var return_date_id = document.getElementById("return_date_id").innerText;
		var no_of_people = document.getElementById("no_of_people").innerText;  */

		//return_date_id = going_to;
		if(no_ == "s"){
			 number_of_people = "people: 1 adults , 0 child, 0 infants";
		}if(flight_type == "round"){
			//data.ReturnDate = current_url.split("#flights")[1].split("/")[2].split("_")[1];
			return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
			$('#return_date_id').html('<span><i class="icon-calendar"></i>'+ return_date+'</i></span>');
			console.log("return_date "+return_date);
		}else if(no_ == "m"){
			adults = current_url.split("#flights")[1].split("/")[4].split("_")[1];
			child = current_url.split("#flights")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#flights")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adults+" adults , "+child+"child, "+infants+" infants";
		}else if(media == "email"){
			console.log("memem");
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1];			
		}else if(media == "call"){
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1];			
		}
		
		/*flight_type_id = flight_type;
		departure_date_id = departure_date;
		departure_place_id = coming_from;
		destination_id = going_to;
		no_of_people = number_of_people;	*/
		console.log("return_date "+return_date+" departure_date"+ departure_date +"flight_type"+flight_type);
		 $('#flight_type').text(flight_type);
		 $('#departure_date_id').html('<span><i class="icon-calendar"></i>'+ departure_date+'</i></span>');
		 
		 $('#departure_place_id').text(coming_from);
		 $('#departure_place_id2').text(going_to);
		 $('#destination_id').text(going_to);
		 $('#destination_id2').text( coming_from);
		 $('#no_of_people').text(number_of_people);
   },
	 beforeRender: function() {
		console.log("xxxxxx"); 
		/*var current_url  = window.location.href.toString();
		
		var coming_from = current_url.split("#flights")[1].split("/")[1].split("_")[0];
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
		var number_of_people ="";
		var flight_type_id = document.getElementById("flight_type").innerText;
		var departure_date_id = document.getElementById("departure_date_id").innerText;
		var departure_place_id = document.getElementById("departure_place_id").innerText;
		var destination_id = document.getElementById("destination_id").innerText;
		var return_date_id = document.getElementById("return_date_id").innerText;
		var no_of_people = document.getElementById("no_of_people").innerText;

		//return_date_id = going_to;
		if(no_ == "s"){
			 number_of_people = "people: 1 adults , 0 child, 0 infants";
		}if(flight_type == "round"){
			data.ReturnDate = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		}else if(no_ == "m"){
			adults = current_url.split("#flights")[1].split("/")[4].split("_")[1];
			child = current_url.split("#flights")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#flights")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adults+" adults , "+child+"child, "+infants+" infants";
		}else if(media == "email"){
			console.log("memem");
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 email=current_url.split("#flights")[1].split("/")[9].split("_")[1];			
		}else if(media == "call"){
			 name=current_url.split("#flights")[1].split("/")[9].split("_")[0];
			 phone=current_url.split("#flights")[1].split("/")[9].split("_")[1];			
		}
		flight_type_id = flight_type;
		departure_date_id = departure_date;
		departure_place_id = coming_from;
		destination_id = going_to;
		no_of_people = number_of_people;*/
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
		var coming_from = current_url.split("#flights")[1].split("/")[1].split("_")[0];
		var going_to = current_url.split("#flights")[1].split("/")[1].split("_")[1];
		var flight_class = current_url.split("#flights")[1].split("/")[1].split("_")[2];
		var departure_date = current_url.split("#flights")[1].split("/")[2].split("_")[0];
		//var return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
		var dates_details = current_url.split("#flights")[1].split("/")[2].split("_");
		var flight_type = dates_details[dates_details.length - 2];
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
		/*var flight_type_id = document.getElementById("flight_type");
		var departure_date_id = document.getElementById("departure_date_id");
		var departure_place_id = document.getElementById("departure_place_id");
		var destination_id = document.getElementById("destination_id");
		var return_date_id = document.getElementById("return_date_id");
		var no_of_people = document.getElementById("no_of_people");*/
		//var no_ = current_url.split("#flights")[1].split("/")[1].split("_")[3];
		
		
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		
		console.log("coming_from "+coming_from+"going_to "+going_to+" flight_type "+flight_type+" no_ "+no_);
		/*if there r multiple people traveling*/
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
/*
   var data = new Object();
   obj.name = "Raj";
   obj.age  = 32;
   obj.married = false;
   var jsonString= JSON.stringify(obj);
*/
		$.ajax({
			url: '//www.roundbob.com/public-api/custom-requests/add.json',
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
		}); 		


	
	},
  });

});
