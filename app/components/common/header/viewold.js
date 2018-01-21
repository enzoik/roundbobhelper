define(function(require, exports, module) {
  "use strict";

  var app = require("app");

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
  });

});
