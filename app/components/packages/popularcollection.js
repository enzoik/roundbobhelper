define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var cache = require("./cache");

  var Packages_model = Backbone.Model.extend({
    defaults: {
      Destination: {},
    },
    initialize: function(){
        // Called everytime a hotel is added to the collection.
        // You can pre configure the hotel object from here
    }
  });

  var Packages = Backbone.Collection.extend({
    model: Packages_model,
//define the filters used to filter data as Get or Post variables
    filters: {
      name: '',
      CountryFrom: '',
      keyword: '',
      Category: '',
     // starsLevel: [],
     // priceRanges: [],
    },

    url: function() {
      return app.packagesApi + 'get-packages.php';
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

      // By default the collection is not in a request.
      this.isRequest = false;
    },
//0704746384
    getCached: function(){
      this.reset();
      var packages = cache.getPackagesSearchResults();
      var packagesCount = packages.length;
      if(packagesCount){
		 
        for(var i=0; i<packagesCount; i++){
          this.add(new Packages_model(packages[i]));
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
			 
		//console.log("length count", obj.Response.destinations.length);
        cache.setPackagesSearchResults(obj.Response.destinations || []);
		
		
		 
      if (obj.Response.destinations.length) {
        return obj.Response.destinations;
		
      }

      return this.models;
    },
  });

  module.exports = Packages;
});
