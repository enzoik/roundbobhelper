define(function(require, exports, module) {
    var app = require('app');
    var Package = {
      Collection: require("./collection"),

      Views: {
        Home: require("./popularhome/view"),
        Item: require("./popularitem/view"),
        Details: require("./details/view"),
      },

      Api: require("./api"),
    };

    return  Backbone.Router.extend({
        go: function() {
          return this.navigate(_.toArray(arguments).join("/"), true);
        },

        routes: {
            "packages": "home",
            "packages/:popular/:details/:id/:resultIndex": "details",
           // "hotel/:id/:resultIndex": "details",
        },

        home: function() {
          if(!$('ContentPopularListView').length){
            $('main').html('<ContentPopularListView style="display:block !important;">load..</ContentPopularListView>');
			console.log("loading from home");
		 }

          $('ContentPopularListView').show();
          $('ContentPackageDetailsView').hide();

          // Only rerender the hotels list when it has been removed.
          // This helps to maitain the scroll of the list
		  
         
            var homeView = new Package.Views.Home();
            this.packages = homeView.collections.packages;
			
            homeView.render();
			

            // Lets render what might be in the cache for the start
             homeView.getCached();
          
       /*   if(!$('hotelList').length){
            var homeView = new Package.Views.Home();
            this.packages = homeView.collections.packages;
            homeView.render();

            // Lets render what might be in the cache for the start
            homeView.getCached();
          }*/
        },

        details: function(id, resultIndex) {
			console.log("show details -----");
          // app.routerCurrentView ='Hotel.details';
		  console.log("this popular log",this);
          if(!this.packages || !this.packages.models || !this.packages.models.length){
            // Redirect if the hotel collection is empty
            this.go(['/']);
          }else{


            if(!$('ContentPackageDetailsView').length){
              $('main').append('<ContentPackageDetailsView style="display:block !important;"></ContentPackageDetailsView>');
            }
            $('ContentPopularListView').hide();
            $('ContentPackageDetailsView').show();

            // Get the hotel selected and pass it to the view
            // Each record in a collection has an Auto uniqueId

            new Package.Views.Details({ model:  this.packages._byId[id]}).render();
          }
        },

    });
});
