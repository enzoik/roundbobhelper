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
		'click .email_quote' : 'email_quote',
	},
	email_quote:function(){
		var client_name = document.getElementById("clients_name").value;
		var clients_email = document.getElementById("clients_email").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var current_url  = window.location.href.toString();
		//http://localhost/helperbob/dist/#flights/ffff_fffffff_Economy/2017-09-17_2017-10-17_round_s/s/single/email/sdng_mail/p234/sent_to
		
		//http://localhost/helperbob/dist/#flights/nnhj_jkjlk_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/email
		if(client_name === null || client_name === undefined || client_name === ""){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);			
		}else if(clients_email === null || clients_email === undefined || clients_email === "" ){
			swal(
			  'Empty',
			  'Email Field Should not Be Left Empty',
			  'error'
			);				
		}else if(!filter.test(clients_email) ){
			swal(
			  'Not Valid',
			  'Provide a valid email e.g bob@roundbob.com',
			  'error'
			);		
		}else{

				//var current_url  = window.location.href.toString();
				console.log(current_url.split("#flights")[1]);
				var url_ = current_url.split("#flights")[1];
				//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
				var redirectTo = '/flights';
				if(url_.split('/')[3] == "m"){
					console.log("many travellers");
					redirectTo += current_url.split("#flights")[1];
					//redirectTo += '/' + "email/summary_email";
					//redirectTo += '/' + client_name+"/"+clients_email+"/summary_email";
					redirectTo += '/' + "m_mail/m_client/m_summary/"+client_name+"_"+clients_email+"_email";
					console.log("email multiple",redirectTo);
					console.log("mmmmm",url_.split('/')[3]);
				}else{
		//http://localhost/roundbobhelperv1/dist/#picklocation/kkkk/26-10-2017_30-10-2017_s/s/single/email/sdng_mail/p234/sent_to  8
		//mutiple email
		//http://localhost/roundbobhelperv1/dist/#picklocation/kkkk/26-10-2017_31-10-2017_m/m/adlts_1_chldn_0_rooms_1/email    5				
				//http://localhost/roundbobhelperv1/dist/#picklocation/kkk/26-10-2017_25-10-2017_s/s/single/email/sdng_mail/p234/sent_to/kkk_kkk@gmail.com_email
					redirectTo += current_url.split("#flights")[1];
					//redirectTo += '/' + "s/single/email/sdng_mail/p234/sent_to/summary_email";
					redirectTo += '/' + client_name+"_"+clients_email+"_email";
					//name_email_email
					console.log("email single",redirectTo);
					console.log("mmmmm",url_.split('/')[3]);
				}

				app.router.go(redirectTo);			
			
		}
	},
  });

});
