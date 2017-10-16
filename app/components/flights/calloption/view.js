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
		'click .submit_call' : 'submit_call',
	},
	submit_call:function(){
		var client_phone = document.getElementById("clients_phone_number").value;
		var client_name = document.getElementById("clients_name").value;
		var current_url  = window.location.href.toString();
		console.log("client_phone_"+client_phone+"client_name"+client_name);
		//http://localhost/helperbob/dist/#flights/dd_ff_Economy/2017-09-17_2017-10-17_round_s/s/single/true_/calling/sen_to
		var coming_from = current_url.split("#flights")[0].split("/")[0].split("_")[0];
		var going_to = current_url.split("#flights")[0].split("/")[0].split("_")[1];
		var flight_class = current_url.split("#flights")[0].split("/")[0].split("_")[2];
		var departure_date = current_url.split("#flights")[0].split("/")[1].split("_")[0];
		var return_date = current_url.split("#flights")[0].split("/")[1].split("_")[1];
		var flight_type = current_url.split("#flights")[0].split("/")[1].split("_")[2];
		var no_ = current_url.split("#flights")[0].split("/")[1].split("_")[3];
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
