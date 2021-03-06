define(function(require, exports, module) {
  "use strict";

  var app = require("app");
 var Cities = Backbone.Model.extend({});
  var Config = {
    // Views needed for this layout
    Views: {
      HeaderNav: require("../../common/header/view"),
      FooterNav: require("../../common/footer/view"),
    },
    api: {
      cities: 'app/api/cities/locations_autocomplete_search_service.php'
    },
    typingDelay: 500
  };

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    el: "main",

    views: {
      "headernav": new Config.Views.HeaderNav(),
      "footernav": new Config.Views.FooterNav(),
    },
	afterRender : function() {
		$("#pick_destination_location_id").show();
		$('#menu-icon-id').show();
	},
	events: {
      'click .pick_destination_location_planner' : 'pick_destination_location',
	   // 'keyup #planner_destination': 'hotel_destination',
	    'keyup #planner_destination changed': 'hotel_destination',
    },
	hotel_destination: function(el){
		var hotel_search = document.getElementById('planner_destination').value.trim();
		/* jQuery.noConflict();
		 $("#planner_destination").autocomplete({
			source: function (request, response) {
			 $.getJSON(
				 Config.api.cities + '?q='+hotel_search,
				function (data) {
				// response(data);
					response( $.map( data, function( item ) {
					  return {
						label: item.desc,
						//value: item.city+","+item.country+","+item.countryCode+","+item.id+","+item.tbo,
						value: item.desc+" - "+item.id,
					  };
					}));
				}
			 );
			},
			//category_id 5900186
			minLength: 2,
			select: function (event, ui) {
			 var selectedObj = ui.item;
			 $("#planner_destination").val(selectedObj.value);
			//getcitydetails(selectedObj.value);
			var redirectTo = '/planner';
		 // redirectTo += current_url.split("#picklocation")[1];
		  redirectTo += '/' + selectedObj.value;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
			 return false;
			},
			search: function () {
			 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			open: function () {
			 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close: function () {
			 $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}


		 });
		 $("#planner_destination").autocomplete("option", "delay", Config.typingDelay);*/
	 jQuery.noConflict();
	 $("#planner_destination").autocomplete({
		source: function (request, response) {
		 $.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+document.getElementById('planner_destination').value.trim(),
			function (data) {
			//	console.log("data",data);
			 response(data);

			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 $("#planner_destination").val(selectedObj.value);
			var redirectTo = '/planner';
		 // redirectTo += current_url.split("#picklocation")[1];
		  redirectTo += '/' + selectedObj.value;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
		 return false;
		},
		open: function () {
		 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 $("#planner_destination").autocomplete("option", "delay", Config.typingDelay);

	},
	pick_destination_location: function(){
		var location_name = document.getElementById("planner_destination").value;
		if(location_name === null || location_name === undefined || location_name === ""){
			swal(
			  'Empty',
			  ' The Location Field Should not Be Left Empty',
			  'error'
			);
		}else{
		//var dest_id_check = location_name.split("-")[1];
		var dest_id = location_name;
		console.log("is dest_id_check",/\d/.test(dest_id));
		console.log("check id",dest_id);
		var has_number = /\d/.test(dest_id);
		//if(!has_number || location_name.length < 3){
		if(location_name.length < 3){
			swal(
			  'Invalid',
			  ' Select a destination from the options given',
			  'error'
			);
		}else{
			var redirectTo = '/planner';
		 // redirectTo += current_url.split("#picklocation")[1];
		  redirectTo += '/' + location_name;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
		}

		}
	},
  });

});
