define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

  module.exports = Layout.extend({
    template: require("ldsh!./template"),

    // el: false,

    beforeRender: function() {
      // Modify the data from here
     /* this.model.set("starsLevelHtml", [
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star"></i>',
        '<i class="icon-star"></i>'
      ].join('\n'));*/

	 this.model.set("name",this.model.attributes.Category.name);
	/* var wallet_percentage =(parseFloat(this.model.attributes.Destination.cost)/1000)*100 ;
	 this.model.set("name",this.model.attributes.Destination.name);
	 this.model.set("cost","USD "+this.model.attributes.Destination.cost);
	 this.model.set("location",this.model.attributes.Destination.location);
	 this.model.set("wallet_position",wallet_percentage);
	 
	 
	 this.model.set("brief_description",this.model.attributes.Destination.brief_description);
	 this.model.set("image_file","http://www.roundbob.com/img/destinations/"+this.model.attributes.Destination.image_file);
	 */
	 
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
      var resultIndex = this.model.attributes.Category.id;
	 
      //var resultIndex = this.model.get("resultIndex");

      // Easily create a URL.
      app.router.go("packages", id, resultIndex);

      return false;
    },

    // onHotelItemSelected: function(e){
    //   // alert(this.model.get("name"));
    //   app.router.go('/','hotel',this.model.get("resultIndex"),this.model.get("resultIndex"));
    //   // app.router.go("org", org, "user", user, "repo", model.get("name"));
    //   // app.router.go("org", org, "user", user, "repo", model.get("name"));
    // }
  });
});
