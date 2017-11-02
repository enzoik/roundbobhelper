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
  };

  module.exports = Backbone.Layout.extend({
    template: require("ldsh!./template"),

    el: "main",

    views: {
      "headernav": new Config.Views.HeaderNav(),
      "footernav": new Config.Views.FooterNav(),
    },
	afterRender : function() {
	
	},
	events: {
      'click .pick_destination_location' : 'pick_destination_location',
	  'keydown #hotel_destination': 'hotel_destination',
    },
	hotel_destination: function(el){
		console.log("xxxx");
	 jQuery.noConflict();
	 $("#hotel_destination").autocomplete({
		source: function (request, response) {
		 $.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+document.getElementById('hotel_destination').value,
			function (data) {
			//	console.log("data",data);
			 response(data);
			 
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 $("#hotel_destination").val(selectedObj.value);
		//getcitydetails(selectedObj.value);
		 return false;
		},
		open: function () {
		 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 $("#hotel_destination").autocomplete("option", "delay", 100);
	
	/*	var CityList = Backbone.Collection.extend({ //Line 11
		  model: Cities,
		//  url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+document.getElementById('hotel_destination').value+'&types=(cities)&key=AIzaSyAVqSfeHJPJ94_Xb68ZEwFBp-DKp3rZuhw',
		  url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+document.getElementById('hotel_destination').value+'&types=(cities)&key=AIzaSyAVqSfeHJPJ94_Xb68ZEwFBp-DKp3rZuhw',
		  //C:\wamp\www\roundbobhelperv1\dist\app\api\airports
		  parse: function(response) {
			 console.log("response",response);
			return response;
		  },
		  sync : function(method, collection, options) {
			options.dataType = "jsonp";
			return Backbone.sync(method, collection, options);
		  },
		});
		var SelectionView = Backbone.View.extend({ //Line 19
		  el : $('#city-selection'),
		  render: function() {
			//$(this.el).html("You Selected : " + this.model.get('name')); //Line 22
			return this;
		  },
		});
		var cityz = new CityList(); //Line 26
		cityz.fetch({async: false});
		console.log("cityz",cityz);
		var cityNames = cityz.pluck("description");
		// console.log("data",userNames);
		jQuery.noConflict();
	
		var hotel_destination = $('#hotel_destination');
	   hotel_destination.autocomplete({ //Line 30
		  source : cityNames,
		  minLength : 2,
		  select: function(event, ui){ //Line 33
		  console.log("uixxx",ui);
			var selectedModel = users.where({name: ui.item.value})[0];
			var view = new SelectionView({model: selectedModel});
			view.render();
		  }
		});*/
	},
	pick_destination_location: function(){
		var location_name = document.getElementById("hotel_destination").value;
		if(location_name === null || location_name === undefined || location_name === ""){
			swal(
			  'Empty',
			  ' The Location Field Should not Be Left Empty',
			  'error'
			);			
		}else{		
			var redirectTo = '/picklocation';
		 // redirectTo += current_url.split("#picklocation")[1];
		  redirectTo += '/' + location_name;
		  console.log("link",redirectTo);
		  app.router.go(redirectTo);
		}
	},
  });

});
