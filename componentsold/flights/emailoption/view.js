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
			$('#clients_name').val(retrieveduserdetails.name);
			$('#clients_email').val(retrieveduserdetails.email);
			$('#client_watsapp').val(retrieveduserdetails.watsapp);
		}else{
			console.log("Not Found",'Not defined');
		}

	},

	events:{
		'click .email_quote_flights' : 'email_quote',
	},
	email_quote:function(){
		var client_name = document.getElementById("clients_name").value;
		var clients_email = document.getElementById("clients_email").value;
		var send_by_email = document.getElementById("option-1");
		var send_by_watsap = document.getElementById("option-2");
		var client_watsapp = document.getElementById("client_watsapp").value.replace(/[^\d]/g, '');
		var watsapp_number = "";
		var client_contact = "";
		var media = "email";
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
		//var phone_filter = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4};
		var current_url  = window.location.href.toString();
		if(send_by_watsap.checked){
			media="watsapp";
			client_contact = document.getElementById("client_watsapp").value;
		}else{
			client_contact = clients_email;
		}
		console.log("send_by_watsap.checked"+send_by_watsap.checked+" send_by_email "+send_by_email.checked);
		if( client_watsapp === null){
							swal(
					  'Empty',
					  ' Whatsapp No. Field Should not Be Left Empty',
					  'error'
					);
		}else if( client_watsapp === ""){
					swal(
					  'Empty',
					  ' Whatsapp No. Field Should not Be Left Empty',
					  'error'
					);
		//}else if(send_by_watsap.checked && phone_filter.test(client_watsapp) && client_watsapp.length < 6 && client_watsapp.length > 12){
		}else if( regex.test(client_watsapp)){
			swal(
			  'Invalid',
			  'Requires an international format for a phone number',
			  'error'
			);			
		}else if( client_watsapp.match(/^[0-9\s(-)]*$/) && client_watsapp.length < 6 && client_watsapp.length > 12){
					swal(
					  'Empty',
					  'Provide a valid Phone number',
					  'error'
					);				
				
		}else if(client_name === null || client_name === undefined || client_name === ""){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);			
		}else if(clients_email === null  ){
			swal(
			  'Empty',
			  'Email Field Should not Be Left Empty',
			  'error'
			);				
		}else if( clients_email === undefined  ){
			swal(
			  'Empty',
			  'Email Field Should not Be Left Empty',
			  'error'
			);				
		}else if(!send_by_watsap.checked && clients_email === null  ){
			swal(
			  'Empty',
			  'Email Field Should not Be Left Empty',
			  'error'
			);				
		}else if( !filter.test(clients_email) ){
			swal(
			  'Not Valid',
			  'Provide a valid email e.g bob@roundbob.com',
			  'error'
			);		
		}else{
				var user_details = { 'name':client_name , 'email': clients_email, 'watsapp':client_watsapp };
				localStorage.setItem('my_user_details', JSON.stringify(user_details));		
				var url_ = current_url.split("#flights")[1];
				//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
				
				var last_spliter = current_url.split("#flights")[1].split("/");
				var last_check = last_spliter[last_spliter.length - 2];
				var last_check2 = last_spliter[last_spliter.length - 1];
				var splitted = current_url.split("#flights")[1].split("/");
				//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
				console.log("last_checker",last_check);
				var redirectTo = '';
				if(last_check =="m_summary" || last_check2 =="watsapp" ){
					
				}else if(url_.split('/')[3] == "m"){
					console.log("many travellers");
					redirectTo = '/flights';
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4];
					redirectTo += '/'+splitted[5];
					//redirectTo += current_url.split("#flights")[1];
					//redirectTo += '/' + "email/summary_email";
					//redirectTo += '/' + client_name+"/"+clients_email+"/summary_email";
					//redirectTo += '/' + "m_mail/m_client/m_summary/"+client_name+"_"+clients_email+"-"+client_watsapp+"_"+media;
					//redirectTo += '/' + "m_mail/m_client/m_summary/"+client_name+"_"+client_contact+"_"+media;
					redirectTo += '/' + "m_mail/m_client/m_summary/"+client_name+"_"+clients_email+"-"+client_watsapp+"_"+media;
					console.log("email multiple",redirectTo);
					console.log("mmmmm",url_.split('/')[3]);
					app.router.go(redirectTo);	
				}else{
//http://localhost/roundbobhelperv1/dist/#flights/EBB- Entebbe Uganda_DXB- Dubai United Arab Emirates_Business/2017-11-23_2017-11-30_round_s/s/single/email/sdng_mail/p234/sent_to
//http://localhost/roundbobhelperv1/dist/#flights/EBB- Entebbe Uganda_DXB- Dubai United Arab Emirates_Economy/2017-11-23_2017-11-30_round_s/s/single/email/sdng_mail/p234/sent_to/summary_email/patrick_patrickkanyere@gmail.com_email
					redirectTo = '/flights';
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					//redirectTo += current_url.split("#flights")[1];
					//redirectTo += "/s/single/email/sdng_mail/p234/sent_to/summary_email";
					redirectTo += "/s/single/email/sdng_mail/p234/sent_to";
					//redirectTo += '/' + "s/single/email/sdng_mail/p234/sent_to/summary_email";
					//redirectTo += '/' +client_name+"_"+client_contact+"_"+media;
					redirectTo += '/' +client_name+"_"+clients_email+"-"+client_watsapp+"_"+media;
					//name_email_email
					console.log("email single",redirectTo);
					console.log("mmmmm",url_.split('/')[3]);
					app.router.go(redirectTo);	
				}

						
			
		}
	},
  });

});
