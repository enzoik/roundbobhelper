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
		if(localStorage.getItem('my_user_details')){
			var retrieveduserdetails = JSON.parse(localStorage.getItem('my_user_details'));
			$('#client_name_hotel').val(retrieveduserdetails.name);
			$('#client_email_hotel').val(retrieveduserdetails.email);
			$('#client_watsapp_no_hotel').val(retrieveduserdetails.watsapp);
		}else{
			console.log("Not Found",'Not defined');
		}
	 
	 },
	events: {
      'click .submit_email_planner' : 'submit_email',
    },
	submit_email:function(){
		var client_name = document.getElementById("client_name_hotel").value;
		var clients_email = document.getElementById("client_email_hotel").value;
		var client_watsapp = document.getElementById("client_watsapp_no_hotel").value.replace(/[^\d]/g, '');
		var send_by_email = document.getElementById("option-1");
		var send_by_watsap = document.getElementById("option-2");
		var watsapp_number = "";
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
		var current_url  = window.location.href.toString();
		var media ="email";
		var stored_email = clients_email;
		if(send_by_watsap.checked){
			clients_email  = client_watsapp;
			media = "watsapp";
		}
		
	if(send_by_watsap.checked && regex.test(client_watsapp)){
			swal(
			  'Invalid',
			  'Requires an international format for a phone number',
			  'error'
			);			
		}
		if(send_by_watsap.checked && client_watsapp === null){
							swal(
					  'Empty',
					  ' Whatsapp No. Field Should not Be Left Empty',
					  'error'
					);
		}else if(send_by_watsap.checked && client_watsapp === ""){
					swal(
					  'Empty',
					  ' Whatsapp No. Field Should not Be Left Empty',
					  'error'
					);
		//}else if(send_by_watsap.checked && phone_filter.test(client_watsapp) && client_watsapp.length < 6 && client_watsapp.length > 12){
		}else if(send_by_watsap.checked && client_watsapp.match(/^[0-9\s(-)]*$/) && client_watsapp.length < 6 && client_watsapp.length > 12){
					swal(
					  'Empty',
					  'Provide a valid watsapp number',
					  'error'
					);					
				
		}else if(client_name === null  && send_by_email.checked ){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);
		}else if(client_name === ""  && send_by_email.checked ){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);
		}else if(clients_email === ""  && send_by_email.checked ){
			swal(
			  'Empty',
			  'Email Field Should not Be Left Empty',
			  'error'
			);			
		}else if(clients_email === null  && send_by_email.checked ){
			swal(
			  'Empty',
			  'Email Field Should not Be Left Empty',
			  'error'
			);			
		}else if(!filter.test(clients_email) && send_by_email.checked ){
			swal(
			  'Not Valid',
			  'Provide a valid email e.g bob@roundbob.com',
			  'error'
			);		
		}else{
			var user_details = { 'name':client_name , 'email': stored_email, 'watsapp':client_watsapp };
			localStorage.setItem('my_user_details', JSON.stringify(user_details));
			//var current_url  = window.location.href.toString();
			console.log(current_url.split("#planner")[1]);
			var url_ = current_url.split("#planner")[1];
			var splitted = current_url.split("#planner")[1].split("/");
			var redirectTo = '/planner';
			if(url_.split('/')[3] == "m"){
				console.log("many travellers");
				redirectTo += '/'+splitted[1];
				redirectTo += '/'+splitted[2];
				redirectTo += '/'+splitted[3];
				redirectTo += '/'+splitted[4];
				redirectTo += '/'+splitted[5];
				redirectTo += '/' + "m_mail/m_client/m_summary/"+client_name+"_"+clients_email+"_"+media;
				console.log("email multiple",redirectTo);
				console.log("mmmmm",url_.split('/')[3]);
			}else{
				redirectTo += '/'+splitted[1];
				redirectTo += '/'+splitted[2];
				redirectTo += '/s/single/email/sdng_mail/p234/sent_to';
				redirectTo += '/' + client_name+"_"+clients_email+"_"+media;
				//name_email_email
				console.log("email single",redirectTo);
				console.log("mmmmm",url_.split('/')[3]);
			}

			app.router.go(redirectTo);			
			
		}
	},
  });

});
