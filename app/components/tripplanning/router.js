define(function(require, exports, module) {
    var app = require('app');
    var Planner = {

      Views: {
        Plannerhelper: require("./plannerpicklocation/view"),
        Plannerhelperdates: require("./plannerpickdates/view"),
        Plannertripdetails: require("./plannerdetails/view"),
        Plannerbookeroptions: require("./plannerbookeroptions/view"),
        Plannerbookingnumber: require("./plannerpeoplebooking/view"),
        Plannerbookingcalloption: require("./calloption/view"),
        Plannerbookingemailoption: require("./emailoption/view"),
        RequestDetails: require("./plannersumary/view"),
      },
    };

    return Backbone.Router.extend({
        routes: {
            "planner": "location",
            "planner/:selectlocation": "selected_location",
            "planner/:selectlocation/:travel_dates": "flighttripotherdetails",
            "planner/:selectlocation/:travel_dates/:trip_details": "flightpeoplebookeroptions",
            "planner/:selectlocation/:travel_dates_m/:trip_details/:multiple": "flightpeople",
            "planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:multibookeroption_h": "hotelmultiplebooker",
			"planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:status/:media/:action/:action_code/:action_end": "singleemailoption",
			"planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:status/:media/:action/:action_end": "singlecalloption",
            "planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:multibookeroption_h/:media": "multipleemailoption",
			"planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:multibookeroption_h/:media/:status": "multiplecalloption",
			"planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:multibookeroption_h/:media/:status/:m_code/:m_send_to/:calling_state/:user_details": "summarycalloption",
			"planner/:selectlocation_h/:travel_dates_m_h/:trip_details/:multiple_h/:multibookeroption_h/:media/:status/:email_code/:email_state/:user_details": "summaryemailoption",
        },

        flighttripotherdetails: function() {
			var current_url  = window.location.href.toString();
			
			
			var url_ = current_url.split("#planner/")[1].split("/")[0];
			var departure_date = current_url.split("#planner/")[1].split("/")[1].split("_")[0];
			var return_date = current_url.split("#planner/")[1].split("/")[1].split("_")[1];
			var travel_trip = current_url.split("#planner/")[1].split("/")[1].split("_")[2];
			
			var dates_cont = departure_date+"_"+return_date+"_"+travel_trip+"_s";
			var multiple_people="s";
		  new Planner.Views.Plannertripdetails({selectlocation:url_,travel_dates:dates_cont}).render();
        
        },
        flightpeoplebookeroptions: function() {
			var current_url  = window.location.href.toString();
			
			
			var url_ = current_url.split("#planner/")[1].split("/")[0];
			var details = current_url.split("#planner/")[1].split("/")[2];
			var departure_date = current_url.split("#planner/")[1].split("/")[1].split("_")[0];
			var return_date = current_url.split("#planner/")[1].split("/")[1].split("_")[1];
			var travel_trip = current_url.split("#planner/")[1].split("/")[1].split("_")[2];
			
			var dates_cont = departure_date+"_"+return_date+"_"+travel_trip+"_s";
			var multiple_people="s";
		  new Planner.Views.Plannerbookeroptions({selectlocation:url_,travel_dates:dates_cont,trip_details:details}).render();
        
        },
        flightpeople: function() {

			var current_url  = window.location.href.toString();
			
			
			var url_ = current_url.split("#planner/")[1].split("/")[0];
			var details = current_url.split("#planner/")[1].split("/")[2];
			var departure_date = current_url.split("#planner/")[1].split("/")[1].split("_")[0];
			var return_date = current_url.split("#planner/")[1].split("/")[1].split("_")[1];
			var travel_trip = current_url.split("#planner/")[1].split("/")[1].split("_")[2];
			var dates_cont = departure_date+"_"+return_date+"_"+travel_trip+"_m";
			var multiple_people="s";
			console.log(url_+" "+dates_cont);
			console.log("multiple_router"+departure_date+" return "+return_date+"trip type"+travel_trip+"current_url"+current_url);
		  new Planner.Views.Plannerbookingnumber({selectlocation:url_,travel_dates:dates_cont,trip_details:details,multiple:"m"}).render();          
        },
		
        hotelmultiplebooker: function() {
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1].split("/")[0];
			var details = current_url.split("#planner/")[1].split("/")[2];
			var summary_of_people = current_url.split("#planner/")[1].split("/")[3];
			var date_range = current_url.split("#planner/")[1].split("/")[1];
			console.log("destination",url_+" "+date_range);
			console.log("current_url",current_url);
		  new Planner.Views.Plannerbookeroptions({selectlocation_h:url_,travel_dates_m_h:date_range,trip_details:details,multiple_h:'m',multibookeroption_h:summary_of_people}).render();
        },
        location: function() {
          
		  new Planner.Views.Plannerhelper().render();
        },
        selected_location: function() {
		  var current_url  = window.location.href.toString();
		  var url_ = current_url.split("#planner/")[1].split("/")[0];
			new Planner.Views.Plannerhelperdates({selectlocation:url_}).render();
			
         // app.activeRouteFunction = 'Home.home';
        },
		
		
		
		singlecalloption: function(){
			console.log("xxxcallersingle");
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1];
			var details = current_url.split("#planner/")[1].split("/")[2];
			console.log("call",url_);			
			new Planner.Views.Plannerbookingcalloption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],trip_details:details,multiple_h:"s",status:"single",media:media_,action:"calling_u",action_end:"calling_client"}).render();
		},
		singleemailoption: function(){
			console.log("xxxemailsingle");
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1];
			var details = current_url.split("#planner/")[1].split("/")[2];	
			console.log("call",url_);
			new Planner.Views.Plannerbookingemailoption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],trip_details:details,multiple_h:"s",status:"single",media:media_,action:"sending_email",action_code:"em_2345",action_end:"send_to"}).render();
		},

		
		
		multiplecalloption: function(){
			console.log("xxxcallermultiple");
			var media_ = "call";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1];
			var details = current_url.split("#planner/")[1].split("/")[2];	
			console.log("call",url_);			
			new Planner.Views.Plannerbookingcalloption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],trip_details:details,multiple_h:"m",multibookeroption_h:url_.split('/')[3],media:media_,status:"call_true"}).render();
		},
		multipleemailoption: function(){
			console.log("xxxemailmultiple");
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1];
			var details = current_url.split("#planner/")[1].split("/")[2];	
			console.log("call",url_);			
			new Planner.Views.Plannerbookingemailoption({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],trip_details:details,multiple_h:"m",multibookeroption_h:url_.split('/')[3],media:media_}).render();
		},

		summarycalloption: function(){
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1];	
			
			var details = current_url.split("#planner/")[1].split("/")[2];
			console.log("call",url_);			
			new Planner.Views.RequestDetails({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],trip_details:details,multiple_h:"m",multibookeroption_h:url_.split('/')[3],media:media_,status:"status",m_code:"m_code",m_send_to:"m_send_to",calling_state:"calling_state",user_details:"user_details"}).render();
		},
		summaryemailoption: function(){
			var media_ = "email";
			var current_url  = window.location.href.toString();
			var url_ = current_url.split("#planner/")[1];
			var details = current_url.split("#planner/")[1].split("/")[2];			
			console.log("call",url_);			
			new Planner.Views.RequestDetails({selectlocation_h:url_.split('/')[0],travel_dates_m_h:url_.split('/')[1],trip_details:details,multiple_h:"m",multibookeroption_h:url_.split('/')[3],media:media_,status:"status",email_code:"email_code",email_state:"email_state",user_details:"user_details"}).render();
		},

    });
});
