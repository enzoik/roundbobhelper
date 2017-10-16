define(function(require, exports, module) {
    var app = require('app');
    var Countries = {
      Collection: require("./countriescollection"),

      Views: {
        Home: require("./countrieshome/view"),
        Item: require("./countriesitem/view"),
        //Details: require("./details/view"),
      },

      Api: require("./api"),
    };

    return  Backbone.Router.extend({
        go: function() {
          return this.navigate(_.toArray(arguments).join("/"), true);
        },

        routes: {
            "packages": "home",
			//"packages/categories": "categories",
           // "hotel/:id/:resultIndex": "details",
        },
		


        home: function() {
          if(!$('ContentCountriesListView').length){
            $('main').html('<ContentCountriesListView style="display:block !important;">load..</ContentCountriesListView>');
			console.log("loading from home");
		 }

          $('ContentCountriesListView').show();
         // $('ContentDetailsView').hide();

          // Only rerender the hotels list when it has been removed.
          // This helps to maitain the scroll of the list
		  
         
            var homeView = new Countries.Views.Home();
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

       /* details: function(id, resultIndex) {
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
        },*/

    });
});
