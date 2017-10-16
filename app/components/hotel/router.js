define(function(require, exports, module) {
    var app = require('app');
    var Hotel = {
      Collection: require("./collection"),

      Views: {
        Home: require("./home/view"),
        Item: require("./item/view"),
        Details: require("./details/view"),
      },

      Api: require("./api"),
    };

    return  Backbone.Router.extend({
        go: function() {
          return this.navigate(_.toArray(arguments).join("/"), true);
        },

        routes: {
            "hotels": "home",
            "hotel/:id/:resultIndex": "details",
        },

        home: function() {
          if(!$('ContentListView').length){
            $('main').html('<ContentListView style="display:block !important;"></ContentListView>');
          }

          $('ContentListView').show();
          $('ContentDetailsView').hide();

          // Only rerender the hotels list when it has been removed.
          // This helps to maitain the scroll of the list
          if(!$('hotelList').length){
            var homeView = new Hotel.Views.Home();
			
            this.hotels = homeView.collections.hotels;
            homeView.render();

            // Lets render what might be in the cache for the start
            homeView.getCached();
          }
        },

        details: function(id, resultIndex) {
          // app.routerCurrentView ='Hotel.details';
          if(!this.hotels || !this.hotels.models || !this.hotels.models.length){
            // Redirect if the hotel collection is empty
            this.go(['/']);
          }else{

            if(!$('ContentDetailsView').length){
              $('main').append('<ContentDetailsView style="display:block !important;"></ContentDetailsView>');
            }
            $('ContentListView').hide();
            $('ContentDetailsView').show();

            // Get the hotel selected and pass it to the view
            // Each record in a collection has an Auto uniqueId

            new Hotel.Views.Details({ model:  this.hotels._byId[id]}).render();
          }
        },

    });
});
