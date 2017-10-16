define(function(require, exports, module) {
  "use strict";

  var app = require('app');

  module.exports = {
    setHotelSearchResults: function(hotels){
      app.store.state.hotels = app.store.state.hotels || {};
      app.store.state.hotels.searchResults = hotels;
      app.store.saveState();
    },

    getHotelSearchResults: function(){
      if(!app.store.state.hotels) return {};
      return app.store.state.hotels.searchResults || {};
    },
  };
});
