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
     // airports: 'app/api/airports/airportssearch.php'
     // airports: '//dp.search.windows.net/indexes/airports/docs/suggest'
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
		$('#menu-icon-id').show();
	
	
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
		//var search_word = document.getElementById('flight_from').value.trim();
		var that = this;
		console.log("that",that);
	  var Item = Backbone.Model.extend({}),
		  Items = Backbone.Collection.extend({model: Item});
	  var choices = new Items();
	  var selected = new Items();
	  var iterator = new Items();
		jQuery.noConflict();
		//$("#autocomplete").autocomplete({
		$("#flight_from").autocomplete({
			source: function (request, response) {
          var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i');

          var query = document.getElementById('flight_from').value.trim();
          var indexName = 'airports';
          var suggesterName = 'airports'; // This is set when indexing documents
          var key = '839974D9C1595B5AB28897F8176272D4';

          var client = AzureSearch({
              url: 'https://dp.search.windows.net/',
              key: key,
              version: '2016-09-01'
          });

          var searchOptions = {
            search: query,
            'api-key': key,
            'suggesterName':suggesterName,
            '$select': 'iata, name, iso', // Fields to be returned
            'fuzzy':true // Allow mistyping e.g `entebe` instead of `entebbe`
          };

          // Fetch Suggestions
          $('.search-loading').html('searching...');
          client.suggest(indexName, searchOptions, function(err, results, raw){
            $('.search-loading').empty();
            choices.reset(results);
            response(choices.filter(function(model) {
             console.log("model",model.attributes.name);
			  return model.attributes.name;
			 /* return {
				label: model.attributes.name,
				value: model.attributes.name
			  }; */          
			}));

          });
			},
        focus: function(event, ui) {
			console.log("item",ui.item.attributes.name);
          $("#flight_from").val(ui.item.attributes.name);
          return false;
        },
        select: function(event, ui) {
          console.log("item",ui);
		  selected.add(ui.item);
          //if (!allowDupes) {
            choices.remove(ui.item);
         // }
          $("#flight_from").val(ui.item.attributes.name);
          return false;
        }

	 }).data('ui-autocomplete')._renderItem = function(ul, item) {
		 console.log("item",item.attributes.name);
        return $('<li/>')
          .data('ui-autocomplete-item', item)
		  .append( "<a>" + item.attributes.name + "</a>" )
         // .append($('<a/>').text(label(item)))
          .appendTo(ul);
      };		
	},
	flight_fromold:function(){
		var search_word = document.getElementById('flight_from').value.trim();
		 jQuery.noConflict();
		/* $("#flight_from").autocomplete({
			source: function (request, response) {
				$.ajax({
					//type:"GET",
					url:Config.api.airports,
					//url:Config.api.airports + '?suggesterName=airports&api-key=839974D9C1595B5AB28897F8176272D4&api-version=2016-09-01&search='+search_word,
					//url:'//dp.search.windows.net/indexes/airports/docs/suggest?suggesterName=airports&api-key=839974D9C1595B5AB28897F8176272D4&api-version=2016-09-01&search=ebb',
				    data:{
						
					},
					contentType:"application/json; charset=utf-8",
					dataType:"json",
					success: function(info){
					console.log("data",info);
				// response(data);
					response( $.map( info, function( item ) {
						if(Array.isArray(item)){
						console.log("item",item);
						console.log("item",item.length);
						var airports = [];
						for (var i = 0; i < item.length; i++) {
								//var name = item[i] ;
							var iata = item[i].iata ;
							var myJSON = JSON.stringify(item[i]);
							var location = myJSON.split(":")[1].split(",")[0];
							console.log("name",myJSON.split(":")[1].split(",")[0]);
							console.log("iata",iata);
							var airport = {
									  "name": location
									};
							airports.push(airport);
							  return {
								label: location,
								value: location
							  };
							}	
							console.log("airports",JSON.stringify(airports));
						}

	

					}));
					},
					error: function(message){
						console.log("data",message);
						response([]);
					}
				});
			} 
			 
		 });*/
		


		/*$("#flight_from").autocomplete({
			source: function (request, response) {
			 $.getJSON(
				//Config.api.airports + '?q='+search_word,
				//Config.api.airports + '?q='+search_word,
				Config.api.airports + '?suggesterName=airports&api-key=839974D9C1595B5AB28897F8176272D4&api-version=2016-09-01&search='+search_word,
				
				function (data) {
				// response(data);
					response( $.map( data, function( item ) {
						console.log("item",item);
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
			 return false;
			},
			open: function () {
			 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close: function () {
			 $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		 });
		 $("#flight_from").autocomplete("option", "delay", Config.typingDelay);*/


	},
	flight_to:function(){
		//var search_word = document.getElementById('flight_from').value.trim();
		var that = this;
		console.log("that",that);
	  var Item = Backbone.Model.extend({}),
		  Items = Backbone.Collection.extend({model: Item});
	  var choices = new Items();
	  var selected = new Items();
	  var iterator = new Items();
		jQuery.noConflict();
		//$("#autocomplete").autocomplete({
		$("#flight_to").autocomplete({
			source: function (request, response) {
          var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i');

          var query = document.getElementById('flight_to').value.trim();
          var indexName = 'airports';
          var suggesterName = 'airports'; // This is set when indexing documents
          var key = '839974D9C1595B5AB28897F8176272D4';

          var client = AzureSearch({
              url: 'https://dp.search.windows.net/',
              key: key,
              version: '2016-09-01'
          });

          var searchOptions = {
            search: query,
            'api-key': key,
            'suggesterName':suggesterName,
            '$select': 'iata, name, iso', // Fields to be returned
            'fuzzy':true // Allow mistyping e.g `entebe` instead of `entebbe`
          };

          // Fetch Suggestions
          $('.searchfrom-loading').html('searching...');
          client.suggest(indexName, searchOptions, function(err, results, raw){
            $('.searchfrom-loading').empty();
            choices.reset(results);
            response(choices.filter(function(model) {
             console.log("model",model.attributes.name);
			  return model.attributes.name;
			 /* return {
				label: model.attributes.name,
				value: model.attributes.name
			  }; */          
			}));

          });
			},
        focus: function(event, ui) {
			console.log("item",ui.item.attributes.name);
          $("#flight_to").val(ui.item.attributes.name);
          return false;
        },
        select: function(event, ui) {
          console.log("item",ui);
		  selected.add(ui.item);
          //if (!allowDupes) {
            choices.remove(ui.item);
         // }
          $("#flight_to").val(ui.item.attributes.name);
          return false;
        }

	 }).data('ui-autocomplete')._renderItem = function(ul, item) {
		 console.log("item",item.attributes.name);
        return $('<li/>')
          .data('ui-autocomplete-item', item)
		  .append( "<a>" + item.attributes.name + "</a>" )
         // .append($('<a/>').text(label(item)))
          .appendTo(ul);
      };	
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
			var economy = document.getElementById("economy");
			var business = document.getElementById("business");
			var first_class = document.getElementById("firstc");
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
