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
			/*console.log(current_url.split("#flights")[0]);
			console.log(current_url.split("#flights")[1]);
			var url_ = current_url.split("#flights")[1];
			var redirectTo = '';
			app.router.go(redirectTo);	*/	
			swal({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Submit!',
			  cancelButtonText: 'cancel!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false
			}).then(function () {
			  swal(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			  );
			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  if (dismiss === 'cancel') {
				swal(
				  'Cancelled',
				  'Your imaginary file is safe :)',
				  'error'
				);
			  }
			});			
			
		}
	},
  });

});
