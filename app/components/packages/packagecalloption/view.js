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
		if(localStorage.getItem('my_user_details')){
			var retrieveduserdetails = JSON.parse(localStorage.getItem('my_user_details'));
			$('#clients_namepackage').val(retrieveduserdetails.name);
			//$('#clients_email').val(retrieveduserdetails.email);
			$('#clients_phone_numberpackage').val(retrieveduserdetails.watsapp);
		}else{
			console.log("Not Found",'Not defined');
		}

	},
	events:{
		'click .submit_callpaackage' : 'submit_call',
	},
	submit_call:function(){

		
		var client_phone = document.getElementById("clients_phone_numberpackage").value;
		var client_name = document.getElementById("clients_namepackage").value;
		var client_email = document.getElementById("clients_emailpackage1").value;
		var current_url  = window.location.href.toString();
		console.log("client_phone_"+client_phone+"client_name"+client_name);
		//http://localhost/helperbob/dist/#flights/dd_ff_Economy/2017-09-17_2017-10-17_round_s/s/single/true_/calling/sen_to
		var coming_from = current_url.split("#surprise")[0].split("/")[0].split("_")[0];
		var going_to = current_url.split("#surprise")[0].split("/")[0].split("_")[1];
		var flight_class = current_url.split("#surprise")[0].split("/")[0].split("_")[2];
		var departure_date = current_url.split("#surprise")[0].split("/")[1].split("_")[0];
		var return_date = current_url.split("#surprise")[0].split("/")[1].split("_")[1];
		var flight_type = current_url.split("#surprise")[0].split("/")[1].split("_")[2];
		var no_ = current_url.split("#surprise")[0].split("/")[1].split("_")[3];
		var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
		//http://localhost/helperbob/dist/#flights/nnhj_jkjlk_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/call/true_/call/true_
		if(client_name === null || client_name === undefined || client_name === ""){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);			
		}else if(client_phone === null || client_phone === undefined || client_phone === "" ){
			swal(
			  'Empty',
			  'Phone Number Should not Be Left Empty',
			  'error'
			);			
		}else if(regex.test(client_phone)){
			swal(
			  'Invalid',
			  'Requires an international format for a phone number',
			  'error'
			);			
		}else{
				var user_details = { 'name':client_name , 'email': "", 'watsapp':client_phone };
				localStorage.setItem('my_user_details', JSON.stringify(user_details));	
				//var current_url  = window.location.href.toString();
				console.log(current_url.split("#surprise")[1]);
				var url_ = current_url.split("#surprise")[1];
				//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
				var last_spliter = current_url.split("#surprise")[1].split("/");
				var last_check = last_spliter[last_spliter.length - 2];
				var splitted = current_url.split("#surprise")[1].split("/");
				//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
				console.log("last_checker",last_check);
				var redirectTo = '';
				if(last_check =="m_client" || last_check =="s_client" ){
					
				}else if(url_.split('/')[3] == "m"){
					console.log("many travellers");
					redirectTo = '/surprise';
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4];
					redirectTo += '/'+splitted[5];
					redirectTo += '/'+splitted[6];
					//redirectTo += current_url.split("#flights")[1];
					//redirectTo += '/' + client_name+"/"+client_phone+"/summary_call";m_mail/m_client/name_email_email
					redirectTo += '/m_mail/m_client/'+client_name+"_"+client_phone+"-"+client_email+"_call";
					console.log("call many",redirectTo);
					console.log("mmmmm",url_.split('/')[3]);
					app.router.go(redirectTo);	
				}else{
		//http://localhost/roundbobhelperv1/dist/#flights/SANTS RAILWAY /2017-11-15_2017-11-28_round_s/s/single/true_/calling/sen_to/s_client/pa_256890988776_call
		//#flights/(MWX) Muan International Airport, Gwangju /2017-11-14_2017-11-29_round_m/m/adlts_1_chldn_0_infnts_0/call/true_/m_mail/m_client/paa_239897876767_call
					redirectTo = '/surprise';
					//redirectTo += current_url.split("#flights")[1];
					//redirectTo += '/' + "call/true_";
					console.log("call single",redirectTo);
					redirectTo += '/'+splitted[1];
					//redirectTo += '/'+splitted[2]+"/s/single/true_/calling/sen_to";
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4];
					redirectTo += '/'+splitted[5];
					redirectTo += '/'+splitted[6];
					redirectTo += '/'+splitted[7];
					//redirectTo += '/' + client_name+"/"+client_phone+"/summary_call";s_client/name_email_email
					redirectTo += '/s_client/'+client_name+"_"+client_phone+"-"+client_email+"_call";
					app.router.go(redirectTo);	
				}

						
			
		}

	
	},
  });

});
