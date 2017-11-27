define(function(require, exports, module,jqueryui) {
  "use strict";

  var app = require("app");
    var User = Backbone.Model.extend({}); //Line 9

  var Config = {
    // Views needed for this layout
    Views: {
      HeaderNav: require("../../common/header/view"),
      FooterNav: require("../../common/footer/view"),
    },
    api: {
      airports: 'app/api/airports/airports_autocomplete_search_service.php'
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
		$('#selected_to').hide();
		$('#selected').hide();

		$('#go_backward_btn').show();
		$('#go_forward_btn').show();
	},

	/*afterRender: function(){
		$('#selected_to').hide();
		$('#selected').hide();
	},*/
	events: {
      'click .continue_to_flight_pick_dates' : 'continue_to_flight_pick_dates',
	  'keyup #flight_to': 'flight_to',
	  'keyup #flight_from': 'flight_from',

    },
	flight_from:function(){
		var search_word = document.getElementById('flight_from').value.trim();
		 jQuery.noConflict();
		 $("#flight_from").autocomplete({
			source: function (request, response) {
			 $.getJSON(
				Config.api.airports + '?q='+search_word,
				function (data) {
				// response(data);
					response( $.map( data, function( item ) {
					  return {
						label: item.name,
						value: item.name
					  };
					}));
				}
			 );
			},

			minLength: 1,
			select: function (event, ui) {
			 var selectedObj = ui.item;
			 $("#flight_from").val(selectedObj.value);
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
		 $("#flight_from").autocomplete("option", "delay", Config.typingDelay);


	},
	flight_to:function(){
		var search_word_to = document.getElementById('flight_to').value.trim();

		 jQuery.noConflict();
		 $("#flight_to").autocomplete({
			source: function (request, response) {
			 $.getJSON(
				Config.api.airports + '?q='+search_word_to,
				function (data) {
					response( $.map( data, function( item ) {
					  return {
						label: item.name,
						value: item.name
					  };
					}));
				}
			 );
			},

			minLength: 1,
			select: function (event, ui) {
			 var selectedObj = ui.item;
			 $("#flight_to").val(selectedObj.value);
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
		 $("#flight_to").autocomplete("option", "delay", Config.typingDelay);
	},
	continue_to_flight_pick_dates:function(e){
	/*	new AutoCompleteView({
			input: $("#flight_to"),
			model: plugins,
			onSelect: function (model) {
				$("#selected").show().find("p").html(model.label());
			},
			highlight: "classname"	// optional, wrap keyword in <b class="classname"></b>
		}).render();*/

			var flight_from = document.getElementById("flight_from").value;
			var flight_to = document.getElementById("flight_to").value;

		if(flight_from === null || flight_from === undefined || flight_from === ""){
			swal(
			  'Empty',
			  ' From Location Field Should not Be Left Empty',
			  'error'
			);
		}else if(flight_to === null || flight_to === undefined || flight_to === "" ){
			swal(
			  'Empty',
			  'Destination Field Should not Be Left Empty',
			  'error'
			);
		}else{
			var current_url  = window.location.href.toString();
			var economy = document.getElementById("option-1");
			var business = document.getElementById("option-2");
			var first_class = document.getElementById("option-3");
			var flight_class="";

			  var airport_code_from = flight_from.split('(')[1].split(')')[0];
			  var airport_city_from = flight_from.split('(')[1].split(')')[1].split(',')[1];
			  var airport_name_from = airport_code_from+ "-" +airport_city_from;

			  var airport_code_to = flight_to.split('(')[1].split(')')[0];
			  var airport_city_to = flight_to.split('(')[1].split(')')[1].split(',')[1];
			  var airport_name_to = airport_code_to+ "-" +airport_city_to;

			if(economy.checked) {
				flight_class="Economy";
			}else if(business.checked){
				flight_class="Business";
			}else if(first_class.checked){
				flight_class="First";
			}
			var last_spliter = current_url.split("#flights")[1].split("/");
			var last_check = last_spliter[last_spliter.length - 1];
			//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
			console.log("last_checker",last_check);
			var redirectTo = '';
		if(last_check =="Economy" || last_check =="Business" || last_check =="First"){

		}else{
		   redirectTo = '/flights';
		  redirectTo += '/' + airport_name_from+"_"+airport_name_to+"_"+flight_class;
		  app.router.go(redirectTo);
		}

		}
	},
  });

});
