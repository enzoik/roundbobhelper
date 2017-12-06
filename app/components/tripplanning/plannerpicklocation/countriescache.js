define(function(require, exports, module) {
  "use strict";

  var app = require('app');

  module.exports = {
    setCountriesSearchResults: function(countries){
      app.store.state.countries = app.store.state.countries || {};
      app.store.state.countries.searchResults = countries;
      app.store.saveState();
    },

    getCountriesSearchResults: function(){
      if(!app.store.state.countries) return {};
      return app.store.state.countries.searchResults || {};
    },
  };
});
//Reservations123@#