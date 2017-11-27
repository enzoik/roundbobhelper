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
		$('#go_backward_btn').show();
		$('#go_forward_btn').show();

	},
	events: {
      'click .email_quotation' : 'email_quotation',
      'click .call_client' : 'call_client',
      'click .available_flights' : 'available_flights',
    },
	email_quotation:function(){
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#flights")[1]);
		var url_ = current_url.split("#flights")[1];
		var splitted = current_url.split("#flights")[1].split("/");
		//var last_spliter = current_url.split("#flights")[1].split("/");
		var last_check = "";
		if(current_url.split("#flights")[1].split("/").length > 2){
			var last_spliter = current_url.split("#flights")[1].split("/")[2];
			 last_check = last_spliter[last_spliter.length - 1];				
		}
		//(YJB) BARCELONA _( Gwangju Korea_Economy/2017-11-21_2017-11-30_round_m/m/adlts_1_chldn_0_infnts_0/email/email	
		console.log("last_checker",last_check);
		var redirectTo = '';
		if(last_check =="email" || last_check =="sent_to" ){
			
		}else if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			 redirectTo = '/flights';
			//redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + splitted[1];
			redirectTo += '/' + splitted[2];
			redirectTo += '/' + splitted[3];
			redirectTo += '/' + splitted[4];
			redirectTo += '/' + "email";
			app.router.go(redirectTo);	
		}else{
//Spain_(MWX) Mua/2017-11-14__oneway_s/s/single/email/sdng_mail/p234/sent_to
			 redirectTo = '/flights';
			redirectTo += '/' + splitted[1];
			redirectTo += '/' + splitted[2];
			redirectTo += '/' + "s/single/email/sdng_mail/p234/sent_to";
			
		app.router.go(redirectTo);	
		}
	
	},
	call_client:function(){
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#flights")[1]);
		var url_ = current_url.split("#flights")[1];
		//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
		//(YJB) BARC/2017-11-23_2017-11-30_round_m/m/adlts_1_chldn_0_infnts_0/call/true_/call/true_
		var splited = current_url.split("#flights")[1].split("/");
		var redirectTo = '/flights';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			redirectTo += '/'+splited[1];
			redirectTo += '/'+splited[2];
			redirectTo += '/'+splited[3];
			redirectTo += '/'+splited[4];
			//redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + "call/true_";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}else{
			//redirectTo += current_url.split("#flights")[1];
			//redirectTo += '/' + "call/true_";
			//http://localhost/roundbobhelperv1/dist/#flights/(YJE) ALICANTE RAIL ALC, Al/2017-11-08_2017-11-20_round_s/s/single/true_/calling/sen_to
			//console.log("multiple",redirectTo);
			redirectTo += '/'+splited[1];
			redirectTo += '/'+splited[2];
			console.log("mmmmm",url_.split('/')[3]);
			//destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling/:call_one
			//travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"true_",calling:"calling",call_one:"sen_to
			redirectTo += '/' + "s/single/true_/calling/sen_to";	
		}
//http://localhost/roundbobhelperv1/dist/#flights/(EBB) Entebbe, Entebbe Uganda_(NBO) Jomo Kenyatta Intl., Nairobi Kenya_Economy/2017-11-07_2017-11-13_round_s/2017-11-07_2017-11-13_round_s/2017-11-07_2017-11-13_round_s/s/single/true_/calling/sen_to/s/single/true_/calling/sen_to
		app.router.go(redirectTo);			
	},
	available_flights:function(){
		console.log("Search for flights");
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
	//	var media = current_url.split("#flights")[1].split("/")[9].split("_")[2];
		console.log("userdetails","coming_from "+coming_from+ " going_to "+going_to+" flight_class "+flight_class+" departure_date "+departure_date+" dates_details "+dates_details+"flight_type"+flight_type);
		
		var name="";
		var email="";
		var phone ="";
		var adults="";
		var infants ="";
		var child="";
		var number_of_people ="";
		var link_flight_type="";

		if(no_ == "s"){
			adults = "1";
			child = "0";
			infants = "0";
		}else if(no_ == "m"){
			adults = current_url.split("#flights")[1].split("/")[4].split("_")[1];
			child = current_url.split("#flights")[1].split("/")[4].split("_")[3];
			infants = current_url.split("#flights")[1].split("/")[4].split("_")[5];
			number_of_people = "people: "+adults+" adults , "+child+"child, "+infants+" infants";
		}
		 if(flight_type == "round"){
					//data.ReturnDate = current_url.split("#flights")[1].split("/")[2].split("_")[1];
					return_date = current_url.split("#flights")[1].split("/")[2].split("_")[1];
					link_flight_type = "return";
		}else{
			link_flight_type = "oneway";
		}
  		$('#progress_metre_id').html('<svg height="10" width="100%" style="background:#ccc;"><line x1="0" y1="0" x2="90%" y2="0" style="stroke:#e7e874;stroke-width:20" />  </svg><span class="centage-label">90%</span>');
			 
	   var linkstring = coming_from+"&to="+going_to+"&dept="+departure_date+"&retn="+return_date+"&adt="+adults+"&chd="+child+"&inf="+infants+"&cls="+flight_class+"&search="+link_flight_type;
	   //var flight_url = "http://beta.roundbob.com/trip-builder/flights?from="+encodeURIComponent(linkstring);
	   var flight_url = "http://beta.roundbob.com/trip-builder/flights?from="+linkstring;
		window.open(flight_url,'_blank');
		
	},
  });

});
