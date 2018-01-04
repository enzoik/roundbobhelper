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
		$('#menu-icon-id').show();
		
	
		jQuery.noConflict();
        $.ajax({
            url: '//m.roundbob.com/API/roundbob_get_countries.php',
            type: 'get',
            data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
				},
            dataType: 'jsonp',
            success:function(response){

                var len = response.Response.countries.length;
 		
				$("#countries_id_activities").empty(); 
			   $("#countries_id_activities").append("<option value='All_all'>All</option>");
                for( var i = 0; i<len; i++){
                    var id = response.Response.countries[i].Country.id;
                    var name = response.Response.countries[i].Country.name;
					//console.log("countries_id",response.Response.countries[i].Country.name);
                    
                    $("#countries_id_activities").append("<option value='"+id+"_"+name+"'>"+name+"</option>");

                }
            }
        });
		
        $.ajax({
            url: '//m.roundbob.com/API/roundbob_get_categories.php',
            type: 'get',
            data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
				},
            dataType: 'jsonp',
            success:function(response){

                var len = response.Response.categories.length;
				console.log("countries",response.Response.categories);
				 $("#categories_id_activities").empty();
			   $("#categories_id_activities").append("<option value='All_all'>All</option>");	
                for( var i = 0; i<len; i++){
					console.log("category_id_activities",response.Response.categories[i]);
					if(typeof response.Response.categories[i].Category.name != "undefined"){
						/*var id = "5900186";
						var name = "Activities";*/
						//5900186_Activities
						var id = response.Response.categories[i].Category.id;
						var name = response.Response.categories[i].Category.name;
						console.log("category_id_activities",response.Response.categories[i]);
						
						$("#categories_id_activities").append("<option value='"+id+"_"+name+"'>"+name+"</option>");						
					}


                }
            }
        });
   
	},

	/*afterRender: function(){
		$('#selected_to').hide();
		$('#selected').hide();
	},*/
	events: {
      'click #continue_to_view_activities' : 'continue_to_view_activities',
	  'keyup #flight_to': 'flight_to',
	  'keyup #flight_from': 'flight_from',

    },

	continue_to_view_activities:function(e){
		console.log("continue_to_view_activities");
		var country = $('select[name=countries_selector]').val();
		//var catvalue = $('select[name=categories_selector]').val();
		var catvalue = "5900186_Activities";
		var redirectTo = '';
		  redirectTo = '/activities';
		  redirectTo += '/'+catvalue+'_' + country;
		  app.router.go(redirectTo);
	},
  });

});
