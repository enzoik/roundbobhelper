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
		'click .email_quotation_hotel' : 'email_quotation_hotel',
		'click .call_client_hotel' : 'call_client_hotel',
		'click .available_hotels' : 'available_hotels',
	},
	email_quotation_hotel:function(ev){
		console.log("emailing");
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#picklocation")[1]);
		var url_ = current_url.split("#picklocation")[1];
		var splitted = current_url.split("#picklocation")[1].split("/");
		//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
		var redirectTo = '/picklocation';
		if(url_.split('/')[3] == "m"){
			//http://localhost/roundbobhelperv1/dist/#picklocation/kamp/14-11-2017_30-11-2017_m/m/adlts_2_chldn_0_rooms_1/email/email
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
		console.log(current_url.split("#picklocation")[1]);
		var url_ = current_url.split("#picklocation")[1];
		var splitted = current_url.split("#picklocation")[1].split("/");
		//http://localhost/roundbobhelperv1/dist/#picklocation/kamp/14-11-2017_30-11-2017_m/m/adlts_2_chldn_0_rooms_1/call/true_
		var redirectTo = '/picklocation';
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
		var redirectTo = '/hotels';
		app.router.go(redirectTo);
	},
  });

});
