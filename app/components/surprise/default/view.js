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
		'click .city_gateaway':'city_gateaway',
		'click .new_years':'new_years',
		'click .honey_moon':'honey_moon',
		'click .formula1':'formula1',
		'click .easter':'easter',
		'click .religous':'religous',
		'click .rugby':'rugby',
		'click .christmas':'christmas',
		'click .business':'business',
	},
	city_gateaway:function(){
		console.log("city_gateaway");
	},
	new_years:function(){
		console.log("new_years");
	},
	honey_moon:function(){
		console.log("honey_moon");
	},
	formula1:function(){
		console.log("formula1");
	},
	easter:function(){
		console.log("easter");
	},
	religous:function(){
		console.log("religous");
	},
	rugby:function(){
		console.log("rugby");
	},
	christmas:function(){
		console.log("christmas");
	},
	business:function(){
		console.log("business");
	},
  });

});
