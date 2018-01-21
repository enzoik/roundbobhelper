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
	var dropdown = document.getElementById("countriesList");
	 if(this.collections.countries.length >1){
		  
	  }
	  this.collections.countries.each(function(Countries_model) {
		//  console.log("countries check",Countries_model.attributes.Country);
		 // console.log("countries check name",Countries_model.attributes.Country.name);
			var optn = document.createElement("OPTION");
			optn.text = Countries_model.attributes.Country.name;
			optn.value = Countries_model.attributes.Country.id;
		//	dropdown.options.add(optn); 
			//console.log("select element",dropdown);
		  
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
		//console.log("Countries rendered ",this);
	  
    },
    initialize: function() {
      // app.hotels = this.collection;
	 // console.log("in the collection view");
      var that = this;
	  
	 /* console.log("countries category",that.collections.countries.models);
	  this.collections.countries.each(function(Countries_model) {
		  console.log("countries check"+Countries_model);
	  });
	  
        this.collections.countries.on('sync',this.render,this);            
        this.collections.countries.fetch();*/
    },
    serialize: function() {
      return {
        model: this.collections.countries,
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
