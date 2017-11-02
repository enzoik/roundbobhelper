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

	},
	events: {
      'click .mutiple_people_quotation' : 'mutiple_people_quotation',
    },
	mutiple_people_quotation:function(){
		var no_of_infants = document.getElementById("infants_id").value;
		var no_of_children = document.getElementById("children_id").value;
		var no_of_adult = document.getElementById("adults_id").value;
		var current_url  = window.location.href.toString();
			var last_spliter = current_url.split("#flights")[1].split("/");
			var last_check = last_spliter[last_spliter.length - 1].split("_");
			var last_hint = last_check[0];
			//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
			console.log("last_checker",last_check);
			var redirectTo = '';
		if(last_hint =="adlts"){
			
		}else{		
		 redirectTo = '/flights';
		  redirectTo += current_url.split("#flights")[1];
		  redirectTo += '/' + "adlts_"+no_of_adult+"_chldn_"+no_of_children+"_infnts_"+no_of_infants;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
		}
	},
  });

});
