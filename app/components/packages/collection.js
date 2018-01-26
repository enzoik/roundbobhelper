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
		//return "http://m.roundbob.com/API/roundbob_get_destinations.php";
		//return "http://localhost/roundbobhelperv1/app/api/raw/packages.php";
		//return "https://beta.roundbob.com/public/api/v1/products.json?callback=?&";
		return "https://beta.roundbob.com/public/api/v1/products.json?where[product_type_id]=1";
    },

    initialize: function(modal,options){
		if(options != undefined){

			this.country_id = options.split("-")[0];
			 var that = this;
			  this.listenTo(that, "reset sync request", this.render);
			  this.listenTo(that, "fetchError", function(){
				that.collection.isRequest = false;
				that.render();
			  });
				this.fetch();
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
	sync: function(method, model, options){   
		//this.isRequest = false;
	  // options.dataType = "jsonp";  
	   options.dataType = "jsonp";  
	   return Backbone.sync(method, model, options);  
	},
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
        //cache.setPackagesSearchResults(obj.Response.destinations || []);
		//this.reset();
		if(!obj) return this.models;
	 
      if (obj.products.length) {
		 var packagesCount = obj.products.length;
        for(var i=0; i<packagesCount; i++){
          this.add(new Packages_model(obj.products[i]));
        }
        return obj.products;
		
      }

      return this.models;
    },
  });

  module.exports = Packages;
});
