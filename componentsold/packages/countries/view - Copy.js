define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

    var Country = {
    // Collections needed for this view
   
   Collection: require("./collection"),

    // Views needed for this layout
    Views: {
    },
  };


  var CountriesCollection = new Country.Collection();

  
  module.exports = Layout.extend({
    template: require("ldsh!./template"),
    collections:{
      countries: CountriesCollection
    },
    // el: false,
    afterRender: function(){
      // Enable DatePicker
      var that = this;
	  
	//  console.log("Countries rendered "+this.collections.countries.length);
	 console.log("log countries");
	 if(this.collections.countries.length >1){
		  
	  }
	  this.collections.countries.each(function(Countries_model) {
		 // console.log("countries check"+Countries_model);
	  });

    },

    beforeRender: function() {
      // Modify the data from here
     /* this.model.set("starsLevelHtml", [
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star"></i>',
        '<i class="icon-star"></i>'
      ].join('\n'));*/
		var that = this;
	// this.model.set("location",this.model.attributes.Destination.location);
		console.log("Countries rendered ",that);
	 
	
	 
    },
    initialize: function() {
      // app.hotels = this.collection;
	  console.log("in the collection view");
      var that = this;
	  
	  console.log("that",that.collections.countries);
	  // this.collections.countries = new ItemCollection();            
        this.collections.countries.on('sync',this.render,this);            
        this.collections.countries.fetch();
      /*this.listenTo(this.collection, "reset sync request", this.render);
      this.listenTo(this.collection, "fetchError", function(){
        that.collection.isRequest = false;
        that.render();
      });
	  that.collection.fetch();*/
    },
    serialize: function() {
      return {
        model: this.model,
        // repo: this.options.repo,
        // user: this.options.user
      };
    },

    getStarsLevel: function(){
      return this.model.starsLevel;
    },

    events: {
      click: "onPackageItemSelected"
    },
//Reservations123!@#
    onPackageItemSelected: function(ev) {
		console.log("selected a package");
     /* var id = this.model.cid;
      var resultIndex = this.model.get("resultIndex");

      // Easily create a URL.
      app.router.go("hotel", id, resultIndex);

      return false;*/
    },

    // onHotelItemSelected: function(e){
    //   // alert(this.model.get("name"));
    //   app.router.go('/','hotel',this.model.get("resultIndex"),this.model.get("resultIndex"));
    //   // app.router.go("org", org, "user", user, "repo", model.get("name"));
    //   // app.router.go("org", org, "user", user, "repo", model.get("name"));
    // }
	
	    getCached: function(){
      CountriesCollection.getCached();
    }
  });
});
