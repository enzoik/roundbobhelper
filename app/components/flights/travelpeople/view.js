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
      'click .mutiple_people_quotation' : 'mutiple_people_quotation',
    },
	mutiple_people_quotation:function(){
		var no_of_infants = document.getElementById("infants_id").value;
		var no_of_children = document.getElementById("children_id").value;
		var no_of_adult = document.getElementById("adults_id").value;
		var current_url  = window.location.href.toString();
		
			var redirectTo = '/flights';
		  redirectTo += current_url.split("#flights")[1];
		  redirectTo += '/' + "adlts_"+no_of_adult+"_chldn_"+no_of_children+"_infnts_"+no_of_infants;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
	},
  });

});
