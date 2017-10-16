define(function(require, exports, module) {
    var app = require('app');
    var Hotelhelper = {

      Views: {
        Hotelhelper: require("./hotelpicklocation/view"),
        Hotelhelperdates: require("./hotelpickdates/view"),
        Hotelbookeroptions: require("./hotelbookeroptions/view"),
        Hotelbookingnumber: require("./hotelpeoplebooking/view"),
        Hotelbookingcalloption: require("./calloption/view"),
        Hotelbookingemailoption: require("./emailoption/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "picklocation": "location",
            "picklocation/:selectlocation": "selected_location",
            "picklocation/:selectlocation/:travel_dates": "flightpeoplebookeroptions",
            "picklocation/:selectlocation/:travel_dates_m/:multiple": "flightpeople",

//picklocation/mm/2017-09-17_2017-09-17_round_m/m/adlts_1_chldn_0_rooms_1
            "picklocation/:selectlocation_h/:travel_dates_m_h/:multiple_h/:multibookeroption_h": "hotelmultiplebooker",
          //#picklocation/nn/2017-09-17_2017-09-17_round_s/s/single/email/sdng_mail/p234/sent_to
		  //picklocation/nn/2017-09-17_2017-09-17_round_s/s/single/call/calling/sen_to
			"picklocation/:selectlocation_h/:travel_dates_m_h/:multiple_h/:status/:media/:action/:action_code/:action_end": "singleemailoption",
			"picklocation/:selectlocation_h/:travel_dates_m_h/:multiple_h/:status/:media/:action/:action_end": "singlecalloption",
			
           // "picklocation/selectdate/multiplebookers/multibookeroption/calloption": "multiplecalloption",
			
          /*  "picklocation/selectdate/onebookeroption/singlecalloption": "singlecalloption",*/
		  //#picklocation/kk/2017-09-17_2017-09-17_round_m/m/adlts_1_chldn_0_rooms_1/email
            "picklocation/:selectlocation_h/:travel_dates_m_h/:multiple_h/:multibookeroption_h/:media": "multipleemailoption",
			//#picklocation/nn/2017-09-17_2017-09-17_round_m/m/adlts_1_chldn_0_rooms_1/call/true_
			"picklocation/:selectlocation_h/:travel_dates_m_h/:multiple_h/:multibookeroption_h/:media/:status": "multiplecalloption",
        },

        flightpeoplebookeroptions: function() {
			/*var departure_date = document.getElementById("travel_date_id").value;
			var return_date = document.getElementById("return_date_id").value;
			var roundtrip = document.getElementById("switch-1");
			var travel_trip="";
			if(roundtrip.checked){
				travel_trip="round";
			}else{
				travel_trip="oneway";
			}*/
			//http://localhost/helperbob/dist/#picklocation/kkk/2017-09-17_2017-09-17_round_s
			var current_url  = window.location.href.toString();
			
			
			console.log("multiple_router"+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
			var url_ = current_url.split("#picklocation/")[1].split("/")[0];
			var departure_date = current_url.split("#picklocation/")[1].split("/")[1].split("_")[0];
			var return_date = current_url.split("#picklocation/")[1].split("/")[1].split("_")[1];
			var travel_trip = current_url.split("#picklocation/")[1].split("/")[1].split("_")[2];
			
			var dates_cont = departure_date+"_"+return_date+"_"+travel_trip+"_s";
			var multiple_people="s";
			console.log(url_+" "+dates_cont);
		  //new Hotelhelper.Views.Hotelbookingnumber({selectlocation:url_,travel_dates:dates_cont}).render();
		  new Hotelhelper.Views.Hotelbookeroptions({selectlocation:url_,travel_dates:dates_cont}).render();
         // app.activeRouteFunction = 'Home.home';
        },
        flightpeople: function() {
			/*var departure_date = document.getElementById("travel_date_id").value;
			var return_date = document.getElementById("return_date_id").value;
			var roundtrip = document.getElementById("switch-1");
			var travel_trip="";
			if(roundtrip.checked){
				travel_trip="round";
			}else{
				travel_trip="oneway";
			}*/
			var current_url  = window.location.href.toString();
			
			
			var url_ = current_url.split("#picklocation/")[1].split("/")[0];
			var departure_date = current_url.split("#picklocation/")[1].split("/")[1].split("_")[0];
			var return_date = current_url.split("#picklocation/")[1].split("/")[1].split("_")[1];
			var travel_trip = current_url.split("#picklocation/")[1].split("/")[1].split("_")[2];
			
			//var url_ = current_url.split("#picklocation/")[1].split("/")[0];
			var dates_cont = departure_date+"_"+return_date+"_"+travel_trip+"_m";
			var multiple_people="s";
			console.log(url_+" "+dates_cont);
			console.log("multiple_router"+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
		  new Hotelhelper.Views.Hotelbookingnumber({selectlocation:url_,travel_dates:dates_cont,multiple:"m"}).render();          
		  //new Hotelhelper.Views.Hotelbookeroptions().render();
         // app.activeRouteFunction = 'Home.home';
        },
        hotelmultiplebooker: function() {
			/*var no_of_rooms = document.getElementById("rooms_id").value;
			var no_of_children = document.getElementById("children_id").value;
			var no_of_adult = document.getElementById("adults_id").value;*/
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#picklocation/")[1].split("/")[0];
			var summary_of_people = current_url.split("#picklocation/")[1].split("/")[3];
			var date_range = current_url.split("#picklocation/")[1].split("/")[1];
			//var peoples_summary = "adlts_"+no_of_adult+"_chldn_"+no_of_children+"_rooms_"+no_of_rooms;
			console.log("destination",url_+" "+date_range);
			console.log("current_url",current_url);
			//http://localhost/helperbob/dist/#picklocation/kkk/2017-09-17_2017-09-17_round_m/m/adlts_1_chldn_0_rooms_1
		  new Hotelhelper.Views.Hotelbookeroptions({selectlocation_h:url_,travel_dates_m_h:date_range,multiple_h:'m',multibookeroption_h:summary_of_people}).render();
         // app.activeRouteFunction = 'Home.home';
        },
        location: function() {
          
		  new Hotelhelper.Views.Hotelhelper().render();
         // app.activeRouteFunction = 'Home.home';
        },
        selected_location: function() {
          //var location_name = document.getElementById("hotel_destination").value;
		  var current_url  = window.location.href.toString();
		  var url_ = current_url.split("#picklocation/")[1].split("/")[0];
			new Hotelhelper.Views.Hotelhelperdates({selectlocation:url_}).render();
			
         // app.activeRouteFunction = 'Home.home';
        },
		
		
		
		singlecalloption: function(){
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#picklocation/")[1];	
			console.log("call",url_);			
			new Hotelhelper.Views.Hotelbookingcalloption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],multiple_h:"s",status:"single",media:media_,action:"calling_u",action_end:"calling_client"}).render();
		},
		singleemailoption: function(){
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#picklocation/")[1];	
			console.log("call",url_);
			new Hotelhelper.Views.Hotelbookingemailoption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],multiple_h:"s",status:"single",media:media_,action:"sending_email",action_code:"em_2345",action_end:"send_to"}).render();
		},

		
		
		multiplecalloption: function(){
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#picklocation/")[1];	
			console.log("call",url_);			
			new Hotelhelper.Views.Hotelbookingcalloption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],multiple_h:"m",multibookeroption_h:url_.split('/')[3],media:media_,status:"call_true"}).render();
		},
		multipleemailoption: function(){
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#picklocation/")[1];	
			console.log("call",url_);			
			new Hotelhelper.Views.Hotelbookingemailoption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],multiple_h:"m",multibookeroption_h:url_.split('/')[3],media:media_}).render();
		},

    });
});
