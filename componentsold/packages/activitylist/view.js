define(function(require, exports, module) {
  "use strict";

  // var collectionMethods = { forEach: 3, each: 3, map: 3, collect: 3, reduce: 4,
  //     foldl: 4, inject: 4, reduceRight: 4, foldr: 4, find: 3, detect: 3, filter: 3,
  //     select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
  //     contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
  //     head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
  //     without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
  //     isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
  //     sortBy: 3, indexBy: 3};
  var app = require("app");
  var Item = require("../activityitem/view");

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    beforeRender: function() {
		
		console.log("Packages","ListViewBeforeRender");
//123ReservationsRB!@#
      var filters = this.collection.filters;
	 // console.log("before check data");
	  //console.log("check data", this.collection);
      this.collection.each(function(packages_model) {
        this.insertView(".package-results", new Item({
          model: packages_model,
          index: 1,
        }));

      }, this);

      if(this.collection.length){
		var current_url  = window.location.href.toString();	
		var category_id = current_url.split("#activities")[1].split('/')[2];

		if(category_id == '5900186' ){
			$('.search-query-result').html(this.collection.length + " Activities found");
		}else{
			$('.search-query-result').html(this.collection.length + " packages found");	
		}
      }
    },

    serialize: function() {
      return { Response: this.collection };
    },

    initialize: function() {
      // app.hotels = this.collection;
      var that = this;
      that.listenTo(that.collection, "reset sync request", that.render);
      that.listenTo(that.collection, "fetchError", function(){
        that.collection.isRequest = false;
        that.render();
      });
	  that.collection.fetch();
    },
  });

});
