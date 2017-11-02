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
      'click .submit_call_details' : 'submit_call_details',
    },
	submit_call_details:function(){
		//single call
		//http://localhost/roundbobhelperv1/dist/#picklocation/kkkkk/26-10-2017_31-10-2017_s/s/single/true_/calling/sen_to     7
		//single email
		//http://localhost/roundbobhelperv1/dist/#picklocation/kkkk/26-10-2017_30-10-2017_s/s/single/email/sdng_mail/p234/sent_to  8
		//mutiple email
		//http://localhost/roundbobhelperv1/dist/#picklocation/kkkk/26-10-2017_31-10-2017_m/m/adlts_1_chldn_0_rooms_1/email    5
		//multiple call
		//http://localhost/roundbobhelperv1/dist/#picklocation/jjj/27-10-2017_31-10-2017_m/m/adlts_1_chldn_0_rooms_1/call/true_   6
		var clients_name = document.getElementById("clients_name").value;
		var clients_phone_number = document.getElementById("clients_phone_number").value;
		console.log("clients_name "+clients_name+" clients_phone_number "+clients_phone_number);
		var current_url  = window.location.href.toString();
		var no_ = current_url.split("#picklocation")[1].split("/")[3];
		
		console.log("people",no_);
		console.log("people",current_url.split("#picklocation")[1]);
		if(clients_name === null || clients_name === undefined || clients_name === ""){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);			
		
		}else if(clients_phone_number === null || clients_phone_number === undefined || clients_phone_number === ""){
			swal(
			  'Empty',
			  'Phone Field Should not Be Left Empty!',
			  'error'
			);
		}else{

			var redirectTo = '/picklocation';
			var splitted = current_url.split("#picklocation")[1].split("/");
			//http://localhost/roundbobhelperv1/dist/#picklocation/hhyy/15-11-2017_30-11-2017_s/s/single/true_/calling/sen_to/m_code/m_send_to/pa_234567798990_call
			//http://localhost/roundbobhelperv1/dist/#picklocation/pat/15-11-2017_23-11-2017_s/s/single/single/true_/calling/sen_to/m_code/m_send_to/paa_123455666_call
			//http://localhost/roundbobhelperv1/dist/#picklocation/jjjjj/16-11-2017_30-11-2017_m/m/adlts_1_chldn_0_rooms_1/call/true_/m_call/m_code/m_send_to/paa_3456677777_call
			if(no_ == "m"){
					//redirectTo += current_url.split("#picklocation")[1];
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4]+'/call/true_';
					//redirectTo += '/' + client_name+"/"+client_phone+"/summary_call";m_mail/m_client/name_email_email
					redirectTo += '/m_call/m_code/m_send_to/' + clients_name+"_"+clients_phone_number+"_call";
					console.log("call many",redirectTo);
					//console.log("mmmmm",url_.split('/')[3]);				
			}else{
					//redirectTo += current_url.split("#picklocation")[1];
					//redirectTo += '/' + client_name+"/"+client_phone+"/summary_call";m_mail/m_client/name_email_email
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4]+'/true_/calling/sen_to';
					redirectTo += '/m_code/m_send_to/' + clients_name+"_"+clients_phone_number+"_call";
					//console.log("call many",redirectTo);
					//console.log("mmmmm",url_.split('/')[3]);				
			}
			app.router.go(redirectTo);
		}
	},
  });

});
