define(function(require, exports, module) {
    var app = require('app');
    var Category = {
      Collection: require("./categoriescollection"),

      Views: {
        Home: require("./categorieshome/view"),
        Item: require("./categoriesitem/view"),
		
		
        PopularHome: require("./popularhome/view"),
        PopularItem: require("./popularitem/view"),
		
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
            "packages": "home",
			"packages/categories": "categories",
			"packages/popular": "popular",
			"packages/:id/:resultIndex": "categoriesresults",
            "packages/:details/:id/:resultIndex": "details",
			"packages/:popular/:details/:id/:resultIndex": "populardetails",
        },
		
		popular: function() {
          if(!$('ContentPopularListView').length){
            $('main').html('<ContentPopularListView style="display:block !important;">load..</ContentPopularListView>');
			console.log("loading from home");
		 }

          $('ContentPopularListView').show();
         // $('ContentDetailsView').hide();

          // Only rerender the hotels list when it has been removed.
          // This helps to maitain the scroll of the list
		  
         
            var homeView = new Category.Views.PopularHome();
            this.packages = homeView.collections.Popular;
			
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
		
		categories: function() {
          if(!$('ContentCategoriesListView').length){
            $('main').html('<ContentCategoriesListView style="display:block !important;">load..</ContentCategoriesListView>');
			console.log("loading from home");
		 }

          $('ContentCategoriesListView').show();
         // $('ContentDetailsView').hide();

          // Only rerender the hotels list when it has been removed.
          // This helps to maitain the scroll of the list
		  
         
            var homeView = new Category.Views.Home();
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

        home: function() {
          if(!$('ContentCategoriesListView').length){
            $('main').html('<ContentCategoriesListView style="display:block !important;">load..</ContentCategoriesListView>');
			console.log("loading from home");
		 }

          $('ContentCategoriesListView').show();
          $('ContentPackageDetailsView').hide();

          // Only rerender the hotels list when it has been removed.
          // This helps to maitain the scroll of the list
		  
         
            var homeView = new Category.Views.Home();
            this.packages = homeView.collections.packages;
			
            homeView.render();
			

            // Lets render what might be in the cache for the start
             homeView.getCached();
          
          if(!$('packageList').length){
            //var homeView = new Category.Views.Home();
            this.packages = homeView.collections.packages;
            homeView.render();

            // Lets render what might be in the cache for the start
            homeView.getCached();
          }
        },
		categoriesresults:function(id, resultIndex){
			console.log("xxxx router cat tap");
			 if(!$('ContentPackagesListView').length){
				$('main').html('<ContentPackagesListView style="display:block !important;">load..</ContentPackagesListView>');
				console.log("loading from home");
			 }

			  $('ContentPackagesListView').show();
			 // $('ContentDetailsView').hide();

			  // Only rerender the hotels list when it has been removed.
			  // This helps to maitain the scroll of the list
			  
			 
				var homeView = new Category.Views.CategoryPackages();
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
				$('ContentPackageDetailsView').show();

				// Get the hotel selected and pass it to the view
				// Each record in a collection has an Auto uniqueId

				new Category.Views.Details({ model:  this.packages._byId[resultIndex]}).render();
          }
        },
        populardetails: function(popular,details,id,resultIndex) {

				  var homeView = new Category.Views.PopularHome();
				this.packages = homeView.collections.populars;
			  if(!this.packages || !this.packages.models || !this.packages.models.length){
				// Redirect if the hotel collection is empty
				this.go(['/']);
			  }else{

				if(!$('ContentPackageDetailsView').length){
				  $('main').append('<ContentPackageDetailsView style="display:block !important;"></ContentPackageDetailsView>');
				}
					$('ContentPopularListView').hide();
					$('ContentPackageDetailsView').show();

					new Category.Views.Details({ model:  this.packages._byId[id]}).render();
			  }
        },

    });
});
