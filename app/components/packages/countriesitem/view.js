define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");
  var Countriessort = {
    // Collections needed for this view
    Collection: require("../collection"),

  };
    var packagesCollection = new Countriessort.Collection();
  module.exports = Layout.extend({
    template: require("ldsh!./template"),

    // el: false,

    beforeRender: function() {

	if(this.model.attributes.Country == undefined){
		console.log("undefined shit");
	 this.model.set("country","Rwanda");
	 this.model.set("img","https://www.roundbob.com/img/countries/index_images/"+"4.jpg");	
	}else{
	console.log("thismodel",this.model.attributes.Country.name);
		if(this.model.attributes.Country.image_file == "default.png"){
		 this.model.set("country",this.model.attributes.Country.name);
		
		 this.model.set("img","https://www.roundbob.com/assets/bobtraveldeals.jpg");			
		}else{
		 this.model.set("country",this.model.attributes.Country.name);
		 this.model.set("img","https://www.roundbob.com/img/countries/index_images/"+this.model.attributes.Country.image_file);		
		}
	}

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
		//alert("tapped category");
    var id = this.model.cid;
	console.log("thisclick", this.model.attributes);
	console.log("thatclick", this.model.cid);
     var resultIndex = this.model.attributes.Country.id;
	 new Countriessort.Collection(null, this.model.attributes.Country.id+"-"+this.model.attributes.Country.name);
    // var resultIndex = this.model.get("resultIndex");
	console.log("collectionxx", packagesCollection);
	// packagesCollection.category_id=this.model.attributes.Country.id;
	 // console.log("collectionxx", packagesCollection.category_id);
      // Easily create a URL.
      var that = this;
      this.listenTo(packagesCollection, "reset sync request", this.render);
      this.listenTo(packagesCollection, "fetchError", function(){
        that.collection.isRequest = false;
        that.render();
      });
	 /* packagesCollection.fetch({
		   dataType: 'jsonp',
		   success : function (data) {
			   console.log("package",data);
	
		   }
		 });*/
      app.router.go("surprise", id, resultIndex);

      return false;
    },


  });
});
