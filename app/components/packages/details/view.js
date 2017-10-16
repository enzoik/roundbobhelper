define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

  var Packages = {
    // Views needed for this layout
    Views: {
      TopNav: require("../../common/topNav/view"),
      TopIconHolder: require("../common/topIconHolder/view"),
    },
  };

  module.exports = Layout.extend({
    template: require("ldsh!./template"),

    // el: 'main',
    el: 'ContentPackageDetailsView',

    views: {
      "topNav": new Packages.Views.TopNav(),
      ".item_nav_e": new Packages.Views.TopIconHolder(),
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
		//console.log("package details after render",this.model);
		
			/*$.ajax('http://localhost/client-backbone-js-ui-repo-fork/app/api/destinationdetails/roundbob_get_destination_details.php', {
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
			}
		}).then(function(response) {
			// handle requested data from server
			console.log("response",response);
		});*/
		var that = this;
		//that.model.set("brief","loading...");
		//console.log("this model",that.model.attributes.Destination.id);
		var destination_id = that.model.attributes.Destination.id;
		$.ajax({
		  dataType: 'jsonp',
		  url: "http://m.roundbob.com/API/roundbob_get_destination_details.php?user_id=b34a758d762edb799b6c305e58d0ef06&did="+destination_id,
		 	data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
			},
		  success: success
		});
		function success(data) {
		  // do something with data, which is an object
		  console.log("response data",data);
		  var info_data = data.Response.destination_details.Destinations.Destination.brief_description;
		  var ref_number = data.Response.destination_details.Destinations.Destination.ref_number;
		  
		  that.model.set("brief",info_data);
		  $('.brief-info').html(info_data);
		  $('.ref-number-info').html(ref_number);
		}
    },

    afterRender: function(){
		
    },

    events: {
      'click .more_plus': 'showRoomsOnly',
      'click .showAll': 'showAll',
      'click #map_show': 'onShowMapBntClicked',
      'click .close-map': 'onCloseMapBntClicked',
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

  });

});
