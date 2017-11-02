define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var cache = require("./countriescache");

  var Countries_model = Backbone.Model.extend({
    defaults: {
      countries: {},
    },
    initialize: function(){
        // Called everytime a hotel is added to the collection.
        // You can pre configure the hotel object from here
    }
  });
//Reservations123!@#
  var Countries = Backbone.Collection.extend({
    model: Countries_model,
//define the filters used to filter data as Get or Post variables
    filters: {
      name: '',
    },

    url: function() {
      return app.countriesApi + 'get-all-countries.php';
	  // return app.hotelsApi + 'get-hotels.php';
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
//123Reservations!@#
      // By default the collection is not in a request.
      this.isRequest = false;
    },
//0704746384
    getCached: function(){
      this.reset();
      var countries = cache.getCountriesSearchResults();
      var countriesCount = countries.length;
	   console.log("length count through getcached", countriesCount);
	   console.log("getcached countries");
      if(countriesCount){
		 
        for(var i=0; i<countriesCount; i++){
          this.add(new Countries_model(countriesCount[i]));
        }
      }
      // this.trigger('gotCached');
    },

    parse: function(obj) {
      // Safety check ensuring only valid data is used.
	  		//console.log("parse",obj);
	  		//console.log("length count", obj.Response);
	  		//console.log("length count", obj.Response.destinations.length);
	  		//console.log("length count", JSON.stringify(obj));
			 
		//console.log("length count", obj.Response.countries);
		console.log( "countries",obj);
        cache.setCountriesSearchResults(obj || []);
		
		
		 
      if (obj.length) {
        return obj;
		
      }

      return this.models;
    },
  });

  module.exports = Countries;
});
