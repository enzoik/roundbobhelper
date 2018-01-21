define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Config = {
    // Views needed for this layout
    Views: {
      HeaderNav: require("../../common/header/view"),
      FooterNav: require("../../common/footer/view"),
    },
  };

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    el: "main",

    views: {
      "headernav": new Config.Views.HeaderNav(),
      "footernav": new Config.Views.FooterNav(),
    },

    events: {
     // "topNav": new Config.Views.TopNav(),
	 'click .get_multiple_clients_quotation':'getQuotation'
    },
	getQuotation:function(){
		var no_of_rooms = document.getElementById("rooms_id").value;
		var no_of_children = document.getElementById("room-1-child").value;
		var no_of_adult = document.getElementById("room-1-adult").value;
		//var adults_in_room1 = document.getElementsByName("adults")[0].value;
		var current_url  = window.location.href.toString();
		var ages = "";
		var redirectTo = '/picklocation';
		//var children_in_room1 = document.getElementsByName("children")[0].value;
		var children_in_room1 = "";
		var children_age = "";
		var age_el="";
		var adultsinoneroom ="";
		var adultsinroom ="";
		var childreninroom ="";
		var adults ="";
		var children ="";
		var chldrn ="";

			var roomssection = no_of_rooms+1;
			for(var i =1;i <= no_of_rooms; i++){
				
				adults="room-"+i+"-adults";
				 children="room-"+i+"-children";
					 console.log("children",children);
				 chldrn = document.getElementsByName(children)[0].value;
				adultsinoneroom +="Room "+i+"-"+document.getElementsByName(adults)[0].value+"-";
				adultsinroom +="Room "+i+"-"+document.getElementsByName(adults)[0].value+"-"+chldrn+"";
				childreninroom +="Room "+i+"-"+document.getElementsByName(children)[0].value+"-";
				for(var x=1;x<=chldrn;x++){
					console.log("xxxx",i+"-"+x);
					 age_el="room-"+i+"-child-age-"+x;
					children_age +="Room "+i+"-"+document.getElementsByName(age_el)[0].value+"yrs-";
					
					console.log("children_age"," Room "+i+" adults "+adultsinroom+" children "+children_in_room1+" Age "+children_age+"yrs");
				}
				adultsinroom +=children_age;				
			}
			var otherdetails = "_adults_"+adultsinoneroom+"_children_"+childreninroom+"_childrenage_"+children_age;
			console.log("Details","rooms_"+no_of_rooms+"_adults_"+adultsinoneroom+"_children_"+childreninroom+"_childrenage_"+children_age);
			console.log("Details2",adultsinroom);
		/*if(no_of_children > 0){
			
		}*/
		
		  redirectTo += current_url.split("#picklocation")[1];
		  redirectTo += '/' + "adlts_"+no_of_adult+"_chldn_"+no_of_children+"_rooms_"+no_of_rooms+otherdetails;
		
		  app.router.go(redirectTo);		
	},
  });

});
