define(function(require, exports, module) {
    var app = require('app');
    var Flight = {

      Views: {
        Flight: require("./flightpicklocations/view"),
        Bookingoption: require("./bookeroptions/view"),
        Calloption: require("./calloption/view"),
        Emailoption: require("./emailoption/view"),
        Flightpickdates: require("./flightpickdates/view"),
        Flightpicklocations: require("./flightpicklocations/view"),
        Travelpeople: require("./travelpeople/view"),
        FinalSummary: require("./flightssumary/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "flights": "getflight",
            //"flights/flightpicklocations": "picklocation",
           // "flights/flightpicklocations/flightpickdates": "pickdates",
            "flights/:flightpicklocations": "pickdates",
            "flights/:destination_place_m/:travel_dates_m/:multiple": "travelpeople",
            "flights/:destination_place/:travel_dates": "travelpeoplebookeroptions",
			"flights/:location_travel_class/:travel_dates/:travel_cat_people/:no_of_people_traveling": "pickdatesbookeroptions",
			// /flights/hj_as_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/email
            "flights/:destination_location/:flightpickdates/:travelpeople/:no_of_travelers/:quotation_media": "morepeopleemailoptions",
            //"flights/flightpicklocations/flightpickdates/travelpeople/bookeroptions/calloptions": "morepeoplecalloptions",
            "flights/:destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling": "morepeoplecalloptions",
			//flights/rr_dd_Economy/2017-09-17_2017-10-17_round_s//s/single/email/sdng_mail
			"flights/:destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling/:call_one": "onepersoncalloption",
			"flights/:destination_location_single/:flightpickdates_single/:single_traveller/:no_of_travelers_one/:quotation_media_single/:emailing_single/:email_one_single/:sending": "onepersonemailoption",
			
			"flights/:destination_location_single/:flightpickdates_single/:single_traveller/:no_of_travelers_one/:quotation_media_single/:emailing_single/:email_one_single/:sending/:summary": "final_details_summary",
      //http://localhost/roundbobhelperv1/dist/#flights/jjj_jjjj_Economy/27-10-2017_31-10-2017__m/m/adlts_1_chldn_0_infnts_0/email/m_mail/m_client/m_summary/kkk_op@gmail.com_email
//many email
	  //http://localhost/roundbobhelperv1/dist/#flights/nnn_qqq_Economy/27-10-2017_30-10-2017__s/s/single/email/sdng_mail/p234/sent_to/kkk_p@gmail.com_email
	  },

        getflight: function() {
          
		  
         // $('mainhome').hide();
		 //$('main').html('<Flightspicklocaion style="display:block !important;"></Flightspicklocaion>');
          //$('Flightspicklocaion').show();
		 
			new Flight.Views.Flight().render();
         // app.activeRouteFunction = 'Home.home';
        },
		
		/*picklocation: function(){
			
			         // $('mainhome').hide();
        //  $('flightspicklocaion').show();

			new Flight.Views.Flight().render();
		},*/
		//selecting the departure and arrival places or airports
		pickdates: function(){
			console.log("flight details");


		var current_url  = window.location.href.toString();
		var url_ = current_url.split("#flights/")[1].split("/")[0];
		//http://localhost/helperbob/dist/#flights/hh_jjjj_Economy/2017-09-17_2017-10-17_round_s
		
		var from_flight=current_url.split("#flights/")[1].split("/")[0].split("_")[0];
		var to_flight=current_url.split("#flights/")[1].split("/")[0].split("_")[1];
		var flight_class_new=current_url.split("#flights/")[1].split("/")[0].split("_")[2];
		console.log("xxxx","from_flight_"+from_flight+"to_flight"+to_flight+"flight_class"+flight_class_new);
			//new Flight.Views.form2({from:from, to:to}).render();
			new Flight.Views.Flightpickdates({flightpicklocations:from_flight+"_"+to_flight+"_"+flight_class_new}).render();
		},
		//filling in the travel dates and selecting multiple people for a trip
		travelpeople: function(){
			/*var departure_date = document.getElementById("departure-date").value;
			var return_date = document.getElementById("return-date").value;
			var roundtrip = document.getElementById("switch-1");
			var current_url  = window.location.href.toString();
			var travel_trip="";
			if(roundtrip.checked){
				travel_trip="round";
			}else{
				travel_trip="oneway";
			}
			//var current_url  = window.location.href.toString();
			console.log("multiple_router"+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
			var url_ = current_url.split("#flights/")[1].split("/")[0];
			var dates_cont = departure_date+"_"+return_date+"_"+travel_trip+"_m";
			var multiple_people="m";
			console.log(url_+" "+dates_cont);*/

		var current_url  = window.location.href.toString();
		var url_ = current_url.split("#flights/")[1].split("/")[0];
		//http://localhost/helperbob/dist/#flights/hh_jjjj_Economy/2017-09-17_2017-10-17_round_s
		
		var date_from_flight=current_url.split("#flights/")[1].split("/")[1].split("_")[0];
		var date_to_flight=current_url.split("#flights/")[1].split("/")[1].split("_")[1];
		var travel_trip_new=current_url.split("#flights/")[1].split("/")[1].split("_")[2];
		console.log("xxxx","from_flight_"+date_from_flight+"to_flight"+date_to_flight+"flight_class"+travel_trip_new);			
			var dates_cont = date_from_flight+"_"+date_to_flight+"_"+travel_trip_new+"_m";
			var multiple_people="m";
			new Flight.Views.Travelpeople({destination_place_m:url_,travel_dates_m:dates_cont,multiple:multiple_people}).render();
		},
		//filling in the travel dates and traveling as one individual
		travelpeoplebookeroptions: function(){
			console.log("book");
		/*	var departure_date = document.getElementById("departure-date").value;
			var return_date = document.getElementById("return-date").value;
			var roundtrip = document.getElementById("switch-1");
			var current_url  = window.location.href.toString();
			var travel_trip="";
			if(roundtrip.checked){
				travel_trip="round";
			}else{
				travel_trip="oneway";
			}
			//var current_url  = window.location.href.toString();
			console.log("one_router "+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
			//one_router 2017-09-17 return 2017-10-17trip typeround current
			//2017-09-17 return 2017-10-17trip typeroundcurrent_urlhttp://localhost/helperbob/dist/#flights/ww_dd_Economy/2017-09-17_2017-10-17_round_s
			*/
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1].split("/")[0];
			var date_from_flight=current_url.split("#flights/")[1].split("/")[1].split("_")[0];
			var date_to_flight=current_url.split("#flights/")[1].split("/")[1].split("_")[1];
			var travel_trip_new=current_url.split("#flights/")[1].split("/")[1].split("_")[2];
				
			var dates_range =date_from_flight+"_"+date_to_flight+"_"+travel_trip_new+"_s";
			new Flight.Views.Bookingoption({destination_place:url_,travel_dates:dates_range}).render();
		},
		//submitting the number of people booking a flight
		pickdatesbookeroptions: function(){
			/*console.log("book");
			var no_of_infants = document.getElementById("infants_id").value;
			var no_of_children = document.getElementById("children_id").value;
			var no_of_adult = document.getElementById("adults_id").value;
			//http://localhost/helperbob/dist/#flights/jjjj_mmmm_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0
			var no_of_people = "adlts_"+no_of_adult+"_chldn_"+no_of_children+"_infnts_"+no_of_infants;*/
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1];
			new Flight.Views.Bookingoption({location_travel_class:url_.split('/')[0],travel_dates:url_.split('/')[1],travel_cat_people:url_.split('/')[2],no_of_people_traveling:url_.split('/')[3]}).render();
		},
		onepersonemailoption: function(){
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1];	
			console.log("call",url_);
			//s/single/email/sdng_mail/p234/sent_to
			new Flight.Views.Emailoption({destination_location_single:url_.split('/')[0],flightpickdates_single:url_.split('/')[1],single_traveller:"s",no_of_travelers_one:"single",quotation_media_single:"email",emailing_single:"sdng_mail",email_one_single:"p234",sending:"sent_to"}).render();
		
		},
		
		onepersoncalloption: function(){
			console.log("book");
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1];
			//s/single/call/calling/sen_to
			//hhh_hhh_Economy/2017-09-17_2017-10-17_round_s/call/true_/s/single/call/calling/sen_to
		
			//new Flight.Views.Calloption({destination_location_:url_.split('/')[0],flightpickdates_:url_.split('/')[1],travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"call",calling:"calling",call_one:"sen_to"}).render();
			//s/single/call/true_/calling/sen_to
			new Flight.Views.Calloption({destination_location_:url_.split('/')[0],flightpickdates_:url_.split('/')[1],travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"true_",calling:"calling",call_one:"sen_to"}).render();
		},
		//quotation request for more than one person
		morepeopleemailoptions: function(){
			console.log("book people");
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1];	
			console.log("email",url_);
			//multiple /flights/hj_as_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/email
			//destination_location/:flightpickdates/:travelpeople/:no_of_travelers/:quotation_media
			new Flight.Views.Emailoption({destination_location:url_.split('/')[0],flightpickdates:url_.split('/')[1],travelpeople:url_.split('/')[2],no_of_travelers:url_.split('/')[3],quotation_media:media_}).render();

		},
		morepeoplecalloptions: function(){
			console.log("book");
			//new Flight.Views.Calloption().render();
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1];	
			console.log("call",url_);
			//multiple /flights/hj_as_Economy/2017-09-17_2017-10-17_round_m/m/adlts_1_chldn_0_infnts_0/email
			//destination_location/:flightpickdates/:travelpeople/:no_of_travelers/:quotation_media
			new Flight.Views.Calloption({destination_location_:url_.split('/')[0],flightpickdates_:url_.split('/')[1],travelpeople_:url_.split('/')[2],no_of_travelers_:url_.split('/')[3],quotation_media_:media_,calling:"true_"}).render();
		
		},
		

		final_details_summary: function(){
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#flights/")[1];	
			console.log("call",url_);
			//s/single/email/sdng_mail/p234/sent_to
			new Flight.Views.FinalSummary({destination_location_single:url_.split('/')[0],flightpickdates_single:url_.split('/')[1],single_traveller:"s",no_of_travelers_one:"single",quotation_media_single:"email",emailing_single:"sdng_mail",email_one_single:"p234",sending:"sent_to",summary:"summary"}).render();
		
		},
    });
});
