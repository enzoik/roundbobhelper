define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var cache = require("./cache");

  var Hotel = Backbone.Model.extend({
    defaults: {
      name: "Not specified",
    },
    initialize: function(){
        // Called everytime a hotel is added to the collection.
        // You can pre configure the hotel object from here
    }
  });

  var Hotels = Backbone.Collection.extend({
    model: Hotel,

    filters: {
      name: '',
      starsLevel: [],
      priceRanges: [],
    },

    url: function() {
      return app.hotelsApi + 'get-hotels.php';
    },

    initialize: function(){

      this.on({
        request: function() {
          this.isRequest = true;
        },

        sync: function() {
          this.isRequest = false;
        },
      });

      // By default the collection is not in a request.
      this.isRequest = false;
    },

    getCached: function(){
      this.reset();
      var hotels = cache.getHotelSearchResults();
      var hotelCount = hotels.length;
      if(hotelCount){
        for(var i=0; i<hotelCount; i++){
          this.add(new Hotel(hotels[i]));
        }
      }
      // this.trigger('gotCached');
    },

    parse: function(obj) {
		
      // Safety check ensuring only valid data is used.
      cache.setHotelSearchResults(obj.hotels || []);

      if (obj.hotels.length) {
        return obj.hotels;
      }

      return this.models;
    },
  });

  module.exports = Hotels;
});
