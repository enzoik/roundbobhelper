define(function(require, exports, module) {
    var app = require('app');
    var Countries = {
      Collection: require("./countriescollection"),

      Views: {
        Home: require("./countrieshome/view"),
        Item: require("./countriesitem/view"),
        //Details: require("./details/view"),
		
		CategoryPackages:require("./home/view"),
        Details: require("./details/view"),
      },

      Api: require("./api"),
    };

    return  Backbone.Router.extend({
        go: function() {
          return this.navigate(_.toArray(arguments).join("/"), true);
        },

        routes: {
            "surprise": "home",
			"surprise/:id/:resultIndex": "categoriesresults",
            "surprise/:details/:id/:resultIndex": "details",
			//"packages/categories": "categories",
           // "hotel/:id/:resultIndex": "details",
        },
		


        home: function() {
			  if(!$('ContentCountriesListView').length){
				$('main').html('<ContentCountriesListView style="display:block !important;">load..</ContentCountriesListView>');
				console.log("loading from home");
			 }

			  $('ContentCountriesListView').show();
			  $('ContentPackagesListView').hide();
			  $('ContentPackageDetailsView').hide();
				var homeView = new Countries.Views.Home();
				this.packages = homeView.collections.packages;
				
				homeView.render();
				

				 homeView.getCached();
          
        },
		categoriesresults:function(id, country_id){
			console.log("Packages","xxxx router cat tap");
			 if(!$('ContentPackagesListView').length){
				$('main').html('<ContentPackagesListView style="display:block !important;">load..</ContentPackagesListView>');
				console.log("loading from home");
			 }

			  $('ContentPackagesListView').show();
			  $('ContentCountriesListView').hide();
			  $('ContentPackageDetailsView').hide();
			 // $('ContentDetailsView').hide();

			  // Only rerender the hotels list when it has been removed.
			  // This helps to maitain the scroll of the list
			  
			 
				var homeView = new Countries.Views.CategoryPackages({country_id: country_id});
				this.packages = homeView.collections.packages;
				
				homeView.render();
				

				// Lets render what might be in the cache for the start
				homeView.getCached();		
		},
        details: function(popular,resultIndex,id,details) {

			  if(!this.packages || !this.packages.models || !this.packages.models.length){
				// Redirect if the hotel collection is empty
				this.go(['/']);
			  }else{

				if(!$('ContentPackageDetailsView').length){
				  $('main').append('<ContentPackageDetailsView style="display:block !important;"></ContentPackageDetailsView>');
				}
				$('ContentPackagesListView').hide();
				$('ContentCountriesListView').show();
				$('ContentPackageDetailsView').show();

				// Get the hotel selected and pass it to the view
				// Each record in a collection has an Auto uniqueId

				new Countries.Views.Details({ model:  this.packages._byId[resultIndex]}).render();
          }
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
