define(function(require, exports, module) {
    var app = require('app');
    var Countries = {
      Collection: require("./countriescollection"),

      Views: {
        CountriesSorter: require("./packageslocation/view"),
        Home: require("./activitieslocation/view"),
        Item: require("./activityitem/view"),
        //Details: require("./details/view"),
		
		CategoryPackages:require("./activityhome/view"),
        Details: require("./activitydetails/view"),
      },

      Api: require("./api"),
    };

    return  Backbone.Router.extend({
        go: function() {
          return this.navigate(_.toArray(arguments).join("/"), true);
        },

        routes: {
            "activities": "home",
			"activities/:id/:resultIndex": "categoriesresults",
            "activities/:details/:id/:resultIndex": "details",
			//"packages/categories": "categories",
           // "hotel/:id/:resultIndex": "details",
        },
		


        home: function() {
			new Countries.Views.Home().render();
			/*  if(!$('ContentCountriesListView').length){
				$('main').html('<ContentCountriesListView style="display:block !important;">load..</ContentCountriesListView>');
				console.log("loading from home");
			 }

			  $('ContentCountriesListView').show();
			  $('ContentPackagesListView').hide();
			  $('ContentPackageDetailsView').hide();
				var homeView = new Countries.Views.Home();
				this.packages = homeView.collections.packages;
				
				homeView.render();
				

				 homeView.getCached();*/
          
        },
		categoriesresults:function(id, country_id){
		//categoriesresults:function(){
			console.log("Packages","xxxx router cat tap");
			var current_url  = window.location.href.toString();

			var country_id_set = current_url.split("#activities")[1].split("/")[2];
			if (typeof country_id === 'undefined'){
				country_id=country_id_set;
			}
			console.log("country_id_set",country_id_set);
			 if(!$('ContentActivitiesListView').length){
				$('main').html('<ContentActivitiesListView style="display:block !important;">load..</ContentActivitiesListView>');
				console.log("loading from activities");
			 }

			  $('ContentActivitiesListView').show();
			  $('ContentCountriesListView').hide();
			  $('ContentActivitiesDetailsView').hide();

				var homeView = new Countries.Views.CategoryPackages({country_id: country_id});
				this.packages = homeView.collections.packages;
				
				homeView.render();
				homeView.getCached();	
		},
        details: function(popular,resultIndex,id,details) {

			  if(!this.packages || !this.packages.models || !this.packages.models.length){
				// Redirect if the hotel collection is empty
				this.go(['/']);
			  }else{

				if(!$('ContentActivitiesDetailsView').length){
				  $('main').append('<ContentActivitiesDetailsView style="display:block !important;"></ContentActivitiesDetailsView>');
				}
				$('ContentActivitiesListView').hide();
				$('ContentCountriesListView').show();
				$('ContentActivitiesDetailsView').show();

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
