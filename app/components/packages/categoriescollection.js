define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var cache = require("./categorycache");

  var Categories_model = Backbone.Model.extend({
    defaults: {
      Category: {},
    },
    initialize: function(){
        // Called everytime a hotel is added to the collection.
        // You can pre configure the hotel object from here
    }
  });

  var Categories = Backbone.Collection.extend({
    model: Categories_model,
//define the filters used to filter data as Get or Post variables
    filters: {
      name: '',
     // CountryFrom: '',
     // keyword: '',
     // Category: '',
     // starsLevel: [],
     // priceRanges: [],
    },

    url: function() {
      return app.categoriesApi + 'get-categories.php';
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
	  console.log("collection test", this);
      var categories = cache.getCategoriesSearchResults();
      var categoriesCount = categories.length;
	   console.log("through getcached", categoriesCount);
      if(categoriesCount){
		 
        for(var i=0; i<categoriesCount; i++){
          this.add(new Categories_model(categories[i]));
        }
      }
      // this.trigger('gotCached');
    },

    parse: function(obj) {
      // Safety check ensuring only valid data is used.

	  		//console.log("length count", obj.Response.destinations.length);
	  		//console.log("length count", JSON.stringify(obj));
			 
		//console.log("length count", obj.Response.categories.length);
        cache.setCategoriesSearchResults(obj.Response.categories || []);
		
		
		 
      if (obj.Response.categories.length) {
        return obj.Response.categories;
		
      }

      return this.models;
    },
  });

  module.exports = Categories;
});
