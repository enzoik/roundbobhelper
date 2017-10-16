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
		events: {
      'click .email_quotation' : 'email_quotation',
      'click .call_client' : 'call_client',
      'click .available_flights' : 'available_flights',
    },
	email_quotation:function(){
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#flights")[1]);
		var url_ = current_url.split("#flights")[1];
		//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
		var redirectTo = '/flights';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + "email";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}else{
			//flights/www_ww_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0
			//#flights/we_as_Economy/2017-09-17_2017-10-17_round_s
			//single_traveller:"s",no_of_travelers_one:"single",quotation_media_single:"email",emailing_single:"sdng_mail",email_one_single:"p234",sending:"sent_to"}).render();
		
			redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + "s/single/email/sdng_mail/p234/sent_to";
			console.log("single",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}

		app.router.go(redirectTo);		
	},
	call_client:function(){
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#flights")[1]);
		var url_ = current_url.split("#flights")[1];
		//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
		var redirectTo = '/flights';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + "call/true_";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}else{
			redirectTo += current_url.split("#flights")[1];
			//redirectTo += '/' + "call/true_";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
			//destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling/:call_one
			//travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"true_",calling:"calling",call_one:"sen_to
			redirectTo += '/' + "s/single/true_/calling/sen_to";	
		}

		app.router.go(redirectTo);			
	},
  });

});
