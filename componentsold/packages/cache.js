define(function(require, exports, module) {
  "use strict";

  var app = require('app');

  module.exports = {
    setPackagesSearchResults: function(packages){
      app.store.state.packages = app.store.state.packages || {};
      app.store.state.packages.searchResults = packages;
      app.store.saveState();
    },

    getPackagesSearchResults: function(){
      if(!app.store.state.packages) return {};
      return app.store.state.packages.searchResults || {};
    },
  };
});
