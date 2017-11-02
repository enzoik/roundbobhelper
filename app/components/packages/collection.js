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
	var category_id="2344";
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
		console.log("category_id0",this.category_id);
     // return app.packagesApi + 'get-packages.php';
      return "http://m.roundbob.com/API/roundbob_get_destinations.php?&country_id="+this.country_id+"&keyword=&subcategory=&key=destinations&user_id=eb94fb88074d11c2e1561653b07fd914&un=pkanyerezi&pw=210013634&page=1&start=0&limit=50";
	  // return app.hotelsApi + 'get-hotels.php';
    },

    initialize: function(modal,options){
		this.country_id = 2;
		if(options != undefined){
		console.log("options",options);
		console.log("opt1",options.split("-")[0]);
		this.country_id = options.split("-")[0];
		console.log("opt2",options.split("-")[1]);
		}
		/*this.country_id = options.opt1;
		this.country_name = options.opt2;
		console.log("details"+this.country_name+" id "+this.country_id);*/
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
			 
		//console.log( obj);
        cache.setPackagesSearchResults(obj.Response.destinations || []);
		
		
		 
      if (obj.Response.destinations.length) {
        return obj.Response.destinations;
		
      }

      return this.models;
    },
  });

  module.exports = Packages;
});
