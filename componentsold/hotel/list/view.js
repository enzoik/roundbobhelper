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
  var Item = require("../item/view");

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    beforeRender: function() {

      var filters = this.collection.filters;
      this.collection.each(function(hotel) {
        // Start Filters
        // FilterBy: starsLevel
        if(filters.starsLevel.length){
          if(!(_.contains(filters.starsLevel, hotel.get("starsLevel")))){
            return;
          }
        }

        // FilterBy: name
        if(filters.name.length){
          if((hotel.get("name").toLowerCase().indexOf(filters.name.trim()) === -1)){
            return;
          }
        }

        // FilterBy: priceRanges
        var priceRangesCount = filters.priceRanges.length;
        var price = hotel.get("minAverPrice");
        if(priceRangesCount){
          var includeHotel = false;
          for(var i=0; i<priceRangesCount; i++){
            if(price >= filters.priceRanges[i].min && price <= filters.priceRanges[i].max){
              includeHotel = true;
              break;
            }
          }
          if(!includeHotel) return;
        }else{
          // console.log("filters.priceRanges", filters.priceRanges);
        }

        // End Filters

        this.insertView(".hotel-results", new Item({
          model: hotel,
          index: 1,
        }));

      }, this);

      if(this.collection.length){
        $('.s-results').html(this.collection.length + " hotels found");
      }
    },

    serialize: function() {
      return { hotels: this.collection };
    },

    initialize: function() {
      // app.hotels = this.collection;
      var that = this;
      this.listenTo(this.collection, "reset sync request", this.render);
      this.listenTo(this.collection, "fetchError", function(){
        that.collection.isRequest = false;
        that.render();
      });
    },
  });

});
