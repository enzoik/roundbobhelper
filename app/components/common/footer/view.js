define(function(require, exports, module) {
  "use strict";

  var app = require("app");
    app.sharableUrl = 'https://roundbob.com';
  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    initialize: function(){
      this.auth = app.store.auth;
    },

    serialize: function() {
      return {
        auth: this.auth,
      };
    },
	events:{
		'click .facebook_like':'facebook_like',
		'click .twitter_handle':'twitter_handle',
		'click .instagram_follow':'instagram_follow',
		'click .youtube_btn':'youtube_btn',
	},
	facebook_like:function(options){
		console.log("facebook");
        var title =  'Roundbob';
        var quote =  '';
        window.open("https://www.facebook.com/dialog/share?href="+escape(options.url || app.sharableUrl)+"&display=popup&app_id=966242223397117"+((quote.length)?"&quote="+quote:""), title, "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
   
	},
	twitter_handle:function(options){
		console.log("twitter");
        var title = options.title || '';
        var quote = options.quote || 'Wow, Roundbob is the easiest way to book my trip';
        window.open("https://twitter.com/home?status="+escape(quote + ' ' + (options.url || app.sharableUrl)), title, "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
   
	},
	instagram_follow:function(options){
		console.log("instagram");
	},
	youtube_btn:function(options){
		console.log("youtube");
        var title = options.title || 'Roundbob';
        var quote = options.quote || '';
        window.open("https://plus.google.com/share?url="+escape(options.url || app.sharableUrl), title, "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
   
	},
  });

});
