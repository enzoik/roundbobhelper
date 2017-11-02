define(function(require, exports, module) {
  "use strict";

  var MyRounters = {
    Flights: require("components/flights/router"),
    Hotelscomp: require("components/hotel/router"),
    Hotels: require("components/hotelhelper/router"),
    Specials: require("components/specialoffers/router"),
  //  Packages: require("components/packages/router"),
    Packages: require("components/packages/categoriesrouter"),
    //Packages: require("components/packages/countriesrouter"),
   // Popular: require("components/packages/popularrouter"),
    Home: require("components/home/router"),
    Surprise: require("components/packages/countriesrouter"),
    Tripplanner: require("components/tripplanner/router"),
    Common: require("components/common/router"),
  };

  require("collectionCache");

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function() {
      // Create SubRoutes that are isolated per component
      this.subRouters = {
          'homeRouter' : new MyRounters.Home(),
          'flightsrouter' : new MyRounters.Flights(),
          'hotelssrouter' : new MyRounters.Hotels(),
          'packagesRouter' : new MyRounters.Packages(),
          'specialrouter' : new MyRounters.Specials(),
          'surpriserouter' : new MyRounters.Surprise(),
          'tripplannerrouter' : new MyRounters.Tripplanner(),
          'commonrouter' : new MyRounters.Common(),
		  
          'hotelscomp' : new MyRounters.Hotelscomp(),
          //'popularRouter' : new MyRounters.Popular()
      };
    },

    // Defined your routers
    routes: {
      "flights": "flights",
      //"packages": "packages",
	  //"packages/categories": "categories",
      "*others": "urlError", 
    },
	
	//categories: function(){
		//alert("categories");
		//this.go();
	//},

  /*  flights: function(){
		console.log("flights coming soon");
      alert("flights comming soon after!");
      this.go();
    },*/
	
/*
    packages: function(){
		
      alert("packages comming soon after!");
      this.go();
    },*/

    urlError: function() {
      alert("Error 404: Invalid URL");
      console.log("urlError",arguments);
      this.go();
    },

    // Shortcut for building a url.
    go: function() {
      return this.navigate(_.toArray(arguments).join("/"), true);
    },
  });

  module.exports = Router;
});
