define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

  module.exports = Layout.extend({
    template: require("ldsh!./template"),

    // el: false,

    beforeRender: function() {
      // Modify the data from here
      this.model.set("starsLevelHtml", [
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star"></i>',
        '<i class="icon-star"></i>'
      ].join('\n'));

      // Make the image links protocol friendly if they are not HTTPS
      this.model.set("thumb", this.model.get("thumb").replace("http:",""));
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
      click: "onHotelItemSelected"
    },

    onHotelItemSelected: function(ev) {
      var id = this.model.cid;
      var resultIndex = this.model.get("resultIndex");

      // Easily create a URL.
      app.router.go("hotel", id, resultIndex);
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
