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
			$('#clients_name').val(retrieveduserdetails.name);
			$('#clients_email').val(retrieveduserdetails.email);
			$('#clients_phone_number').val(retrieveduserdetails.watsapp);
		}else{
			console.log("Not Found",'Not defined');
		}
	 
	 },
	events: {
      'click .submit_call_details_planner' : 'submit_call_details',
    },
	submit_call_details:function(){
		var clients_name = document.getElementById("clients_name").value;
		var clients_phone_number = document.getElementById("clients_phone_number").value;
		console.log("clients_name "+clients_name+" clients_phone_number "+clients_phone_number);
		var current_url  = window.location.href.toString();
		var no_ = current_url.split("#planner")[1].split("/")[4];
		var clients_email = document.getElementById("clients_email").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		 var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
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
		}else if(regex.test(clients_phone_number)){
			swal(
			  'Invalid',
			  'Requires an international format for a phone number',
			  'error'
			);			
		}else if(!filter.test(clients_email) ){
			swal(
			  'Not Valid',
			  'Provide a valid email e.g bob@roundbob.com',
			  'error'
			);		
		}else{
			var user_details = { 'name':clients_name , 'email': clients_email, 'watsapp':clients_phone_number };
			localStorage.setItem('my_user_details', JSON.stringify(user_details));
			var redirectTo = '/planner';
			var splitted = current_url.split("#planner")[1].split("/");
			if(no_ == "m"){
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4];
					redirectTo += '/'+splitted[5]+'/call/true_';
					redirectTo += '/m_call/m_code/m_send_to/' + clients_name+"_"+clients_email+"-"+clients_phone_number+"_call";
					console.log("call many",redirectTo);				
			}else{
					redirectTo += '/'+splitted[1];
					redirectTo += '/'+splitted[2];
					redirectTo += '/'+splitted[3];
					redirectTo += '/'+splitted[4];
					redirectTo += '/'+splitted[5]+'/true_/calling/sen_to';
					redirectTo += '/m_code/m_send_to/' + clients_name+"_"+clients_email+"-"+clients_phone_number+"_call";		
			}
			app.router.go(redirectTo);
		}
	},
  });

});
