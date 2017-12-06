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
	 beforeRender: function() {
		console.log("xxxxxx"); 
	 },
	 afterRender: function(){
		 $('#available_planner').hide();
	 },
    views: {
      "headernav": new Config.Views.HeaderNav(),
      "footernav": new Config.Views.FooterNav(),
    },

	events:{
		'click .email_quotation_planner' : 'email_quotation_hotel',
		'click .call_client_planner' : 'call_client_hotel',
		'click .available_planner' : 'available_hotels',
	},
	email_quotation_hotel:function(ev){
		console.log("emailing");
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#planner")[1]);
		var url_ = current_url.split("#planner")[1];
		var splitted = current_url.split("#planner")[1].split("/");
		var redirectTo = '/planner';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			//redirectTo += current_url.split("#picklocation")[1];
			redirectTo += '/'+splitted[1];
			redirectTo += '/'+splitted[2];
			redirectTo += '/'+splitted[3];
			redirectTo += '/'+splitted[4];
			redirectTo += '/' + "email";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}else{
//http://localhost/roundbobhelperv1/dist/#picklocation/kamp/15-11-2017_30-11-2017_s/s/single/email/sdng_mail/p234/sent_to
			redirectTo += '/'+splitted[1];
			redirectTo += '/'+splitted[2];
			redirectTo += '/' + "s/single/email/sdng_mail/p234/sent_to";
			console.log("single",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}

		app.router.go(redirectTo);	
	},
	call_client_hotel:function(ev){
		console.log("call");
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#planner")[1]);
		var url_ = current_url.split("#planner")[1];
		var splitted = current_url.split("#planner")[1].split("/");
		//http://localhost/roundbobhelperv1/dist/#picklocation/kamp/14-11-2017_30-11-2017_m/m/adlts_2_chldn_0_rooms_1/call/true_
		var redirectTo = '/planner';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			//redirectTo += current_url.split("#picklocation")[1];
			redirectTo += '/'+splitted[1];
			redirectTo += '/'+splitted[2];
			redirectTo += '/'+splitted[3];
			redirectTo += '/'+splitted[4];
			redirectTo += '/' + "call/true_";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}else{
			//http://localhost/roundbobhelperv1/dist/#picklocation/liouu/15-11-2017_30-11-2017_s/s/single/true_/calling/sen_to
			//redirectTo += current_url.split("#picklocation")[1];
			//redirectTo += '/' + "call/true_";
			redirectTo += '/'+splitted[1];
			redirectTo += '/'+splitted[2];
			redirectTo += '/' + "s/single/true_/calling/sen_to";	
		}

		app.router.go(redirectTo);	
	},
	available_hotels:function(ev){
		console.log("available hotels");
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#planner")[1]);
		var url_ = current_url.split("#planner")[1];
		var splitted = current_url.split("#planner")[1].split("/");
		var destination="";
		var chech_in_date="";
		var chech_out_date="";
		var adult="";
		var children="";
		var rooms="";
		var dd_id ="";

		var redirectTo = '/planner';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			destination = splitted[1].split("-")[0];
			dd_id = splitted[1].split("-")[1];
			chech_in_date = splitted[2].split("_")[0];
			chech_out_date = splitted[4].split("_")[1];
			adult = splitted[4].split("_")[1];
			children = splitted[4].split("_")[3];
			rooms = splitted[4].split("_")[5];
		}else{
			destination = splitted[1].split("-")[0];
			dd_id = splitted[1].split("-")[1];
			chech_in_date = splitted[2].split("_")[0];
			chech_out_date = splitted[2].split("_")[1];

			adult = "1";
			children = "0";
			rooms = "1";
		}
		$('#progress_metre_id').html('<svg height="10" width="100%" style="background:#ccc;"><line x1="0" y1="0" x2="90%" y2="0" style="stroke:#e7e874;stroke-width:20" />  </svg><span class="centage-label">90%</span>');
					
		var hotels_url_params = destination+"&did="+dd_id.trim()+"&checkin="+chech_in_date.trim()+"&checkout="+chech_out_date.trim();
		console.log("hotels_url",hotels_url_params);
		var hotel_url = "http://beta.roundbob.com/trip-builder/hotels?q="+hotels_url_params;
		window.open(hotel_url,'_blank');
	},
  });

});
