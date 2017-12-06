define(function(require, exports, module) {
    var app = require('app');
    var Countries = {
      Collection: require("./countriescollection"),

      Views: {
        CountriesSorter: require("./packageslocation/view"),
        Home: require("./countrieshome/view"),
        PackagePickdates: require("./packagepickdates/view"),
        Travelpeople: require("./packagetravelpeople/view"),
        Bookingoption: require("./packagebookeroptions/view"),		
        Emailoption: require("./packageemailoption/view"),
        Calloption: require("./packagecalloption/view"),
        FinalSummary: require("./packageflightssumary/view"),
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
			 "surprise/:flightpicklocations": "pickdates",
			 "surprise/:destination_place_m/:travel_dates_m/:multiple": "travelpeople",
			 "surprise/:destination_place/:travel_dates": "travelpeoplebookeroptions",
			 "surprise/:location_travel_class/:travel_dates/:travel_cat_people/:no_of_people_traveling": "pickdatesbookeroptions",			 
			 "surprise/:destination_location/:flightpickdates/:travelpeople/:no_of_travelers/:quotation_media": "morepeopleemailoptions",
            //"flights/flightpicklocations/flightpickdates/travelpeople/bookeroptions/calloptions": "morepeoplecalloptions",
            "surprise/:destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling": "morepeoplecalloptions",
			//flights/rr_dd_Economy/2017-09-17_2017-10-17_round_s//s/single/email/sdng_mail
			"surprise/:destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling/:call_one": "onepersoncalloption",
			"surprise/:destination_location_single/:flightpickdates_single/:single_traveller/:no_of_travelers_one/:quotation_media_single/:emailing_single/:email_one_single/:sending": "onepersonemailoption",
			
			"surprise/:destination_location_single/:flightpickdates_single/:single_traveller/:no_of_travelers_one/:quotation_media_single/:emailing_single/:email_one_single/:sending/:summary": "final_details_summary",
			"surprise/:destination_location_single/:flightpickdates_single/:single_traveller/:no_of_travelers_one/:quotation_media_single/:emailing_single/:email_one_single/:sending/:summary/:results/:packages": "categoriesresults",
			"surprise/:destination_location_single/:flightpickdates_single/:single_traveller/:no_of_travelers_one/:quotation_media_single/:emailing_single/:email_one_single/:sending/:summary/:results/:packages/:id/:resultIndex": "details",
		//http://localhost/roundbobhelperv1/dist/#surprise//4_City%20getaway_1_Uganda/2017-12-12_2017-12-27_round_s/m/adlts_1_chldn_0_infnts_0/email/m_mail/m_client/m_summary/mydetails/results/packages
		
			/*"surprise/:id/:resultIndex": "categoriesresults",
            "surprise/:details/:id/:resultIndex": "details",*/

        },
		


        home: function() {
			new Countries.Views.CountriesSorter().render();
          
        },
		pickdates:function(){
		var current_url  = window.location.href.toString();
		var url_ = current_url.split("#surprise/")[1].split("/")[0];
		//http://localhost/helperbob/dist/#flights/hh_jjjj_Economy/2017-09-17_2017-10-17_round_s
		
		var catvalue=current_url.split("#surprise/")[1].split("/")[0].split("_")[0];
		var country=current_url.split("#surprise/")[1].split("/")[0].split("_")[1];
			//new Flight.Views.form2({from:from, to:to}).render();
			new Countries.Views.PackagePickdates({flightpicklocations:catvalue+"_"+country}).render();
		},
		travelpeople:function(){
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1].split("/")[0];
			//http://localhost/helperbob/dist/#flights/hh_jjjj_Economy/2017-09-17_2017-10-17_round_s
			
			var date_from_flight=current_url.split("#surprise/")[1].split("/")[1].split("_")[0];
			var date_to_flight=current_url.split("#surprise/")[1].split("/")[1].split("_")[1];
			//var travel_trip_new=current_url.split("#flights/")[1].split("/")[1].split("_")[2];
			//console.log("xxxx","from_flight_"+date_from_flight+"to_flight"+date_to_flight+"flight_class"+travel_trip_new);			
				var dates_cont = date_from_flight+"_"+date_to_flight+"_m";
				var multiple_people="m";
				new Countries.Views.Travelpeople({destination_place_m:url_,travel_dates_m:dates_cont,multiple:multiple_people}).render();			
		},
		travelpeoplebookeroptions:function(){
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1].split("/")[0];
			var date_from_flight=current_url.split("#surprise/")[1].split("/")[1].split("_")[0];
			var date_to_flight=current_url.split("#surprise/")[1].split("/")[1].split("_")[1];
			//var travel_trip_new=current_url.split("#surprise/")[1].split("/")[1].split("_")[2];
				
			var dates_range =date_from_flight+"_"+date_to_flight+"_s";
			new Countries.Views.Bookingoption({destination_place:url_,travel_dates:dates_range}).render();			
		},
		pickdatesbookeroptions:function(){
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1];
			new Countries.Views.Bookingoption({location_travel_class:url_.split('/')[0],travel_dates:url_.split('/')[1],travel_cat_people:url_.split('/')[2],no_of_people_traveling:url_.split('/')[3]}).render();
				
		},
		
		onepersonemailoption: function(){
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1];	
			console.log("call",url_);
			//s/single/email/sdng_mail/p234/sent_to
			new Countries.Views.Emailoption({destination_location_single:url_.split('/')[0],flightpickdates_single:url_.split('/')[1],single_traveller:"s",no_of_travelers_one:"single",quotation_media_single:"email",emailing_single:"sdng_mail",email_one_single:"p234",sending:"sent_to"}).render();
		
		},
		
		onepersoncalloption: function(){
			console.log("book");
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1];
			//s/single/call/calling/sen_to
			//hhh_hhh_Economy/2017-09-17_2017-10-17_round_s/call/true_/s/single/call/calling/sen_to
		
			//new Flight.Views.Calloption({destination_location_:url_.split('/')[0],flightpickdates_:url_.split('/')[1],travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"call",calling:"calling",call_one:"sen_to"}).render();
			//s/single/call/true_/calling/sen_to
			//http://localhost/roundbobhelperv1/dist/#flights/(EBB) Entebbe, Entebbe Uganda_(NBO) Jomo Kenyatta Intl., Nairobi Kenya_Economy/2017-11-07_2017-11-13_round_s/2017-11-07_2017-11-13_round_s/2017-11-07_2017-11-13_round_s/s/single/true_/calling/sen_to/s/single/true_/calling/sen_to
			//http://localhost/roundbobhelperv1/dist/#flights/(EBB) Entebbe, Entebbe Uganda_(NBO) Jomo Kenyatta Intl., Nairobi Kenya_Economy/2017-10-30_2017-11-20_round_m/m/adlts_1_chldn_0_infnts_0/call/true_
			new Countries.Views.Calloption({destination_location_:url_.split('/')[0],flightpickdates_:url_.split('/')[1],travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"true_",calling:"calling",call_one:"sen_to"}).render();
		},
		//quotation request for more than one person
		morepeopleemailoptions: function(){
			console.log("book people");
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1];	
			console.log("email",url_);
			//multiple /flights/hj_as_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/email
			//destination_location/:flightpickdates/:travelpeople/:no_of_travelers/:quotation_media
			new Countries.Views.Emailoption({destination_location:url_.split('/')[0],flightpickdates:url_.split('/')[1],travelpeople:url_.split('/')[2],no_of_travelers:url_.split('/')[3],quotation_media:media_}).render();

		},
		morepeoplecalloptions: function(){
			console.log("book");
			//new Flight.Views.Calloption().render();
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1];	
			console.log("call",url_);
			//multiple /flights/hj_as_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/email
			//destination_location/:flightpickdates/:travelpeople/:no_of_travelers/:quotation_media
			new Countries.Views.Calloption({destination_location_:url_.split('/')[0],flightpickdates_:url_.split('/')[1],travelpeople_:url_.split('/')[2],no_of_travelers_:url_.split('/')[3],quotation_media_:media_,calling:"true_"}).render();
		
		},
		

		final_details_summary: function(){
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#surprise/")[1];	
			console.log("call",url_);
			//s/single/email/sdng_mail/p234/sent_to
			new Countries.Views.FinalSummary({destination_location_single:url_.split('/')[0],flightpickdates_single:url_.split('/')[1],single_traveller:"s",no_of_travelers_one:"single",quotation_media_single:"email",emailing_single:"sdng_mail",email_one_single:"p234",sending:"sent_to",summary:"summary"}).render();
		
		},
		
		categoriesresults:function(){
		//http://localhost/roundbobhelperv1/dist/#surprise/4_City%20getaway_1_Uganda/2017-12-12_2017-12-27_s
			console.log("Packages","xxxx router cat tap");
			var current_url  = window.location.href.toString();

			var country_id = current_url.split("#surprise")[1].split("/")[1].split("_")[2];
			console.log("Packages",country_id);
			var cat_id = current_url.split("#surprise")[1].split("/")[1].split("_")[0];
			/*if (typeof country_id === 'undefined'){
				country_id=country_id_set;
			}*/
			console.log("country_id_set",country_id);
			 if(!$('ContentPackagesListView').length){
				$('main').html('<ContentPackagesListView style="display:block !important;">load..</ContentPackagesListView>');
				console.log("loading from home");
			 }

			  $('ContentPackagesListView').show();
			  $('ContentCountriesListView').hide();
			  $('ContentPackageDetailsView').hide();

				var homeView = new Countries.Views.CategoryPackages({country_id: country_id});
				this.packages = homeView.collections.packages;
				
				homeView.render();
				homeView.getCached();	
		},

        details: function(sorter,date,peope,no_of_peope,media,m_media,m_client,m_summary,my_details,results,packages, resultIndex,id) {

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
				//console.log("resultIndex",resultIndex);
				new Countries.Views.Details({ model:  this.packages._byId[resultIndex]}).render();
          }
        },


    });
});
