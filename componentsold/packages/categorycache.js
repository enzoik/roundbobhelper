define(function(require, exports, module) {
  "use strict";

  var app = require('app');

  module.exports = {
    setCategoriesSearchResults: function(categories){
      app.store.state.categories = app.store.state.categories || {};
      app.store.state.categories.searchResults = categories;
      app.store.saveState();
    },

    getCategoriesSearchResults: function(){
      if(!app.store.state.categories) return {};
      return app.store.state.categories.searchResults || {};
    },
  };
});
