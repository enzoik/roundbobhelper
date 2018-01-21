define(function(require, exports, module) {
  "use strict";

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),
  });
  
});
