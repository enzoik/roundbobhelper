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
    afterRender: function(){  
		$('#go_backward_btn').show();
		$('#go_forward_btn').hide();
	},
	 beforeRender: function() {
		console.log("xxxxxx"); 

	 },
	events:{
		'click .send_confirmed_request' : 'send_confirmed_request',
	},
	send_confirmed_request:function(){

	
	},
  });

});
