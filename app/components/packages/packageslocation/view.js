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
    //  airports: 'app/api/airports/airports_autocomplete_search_service.php'
      categoriesurl: 'app/api/raw/categories.json'
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
           // url: '//m.roundbob.com/API/roundbob_get_countries.php',
            url: '//beta.roundbob.com/public/api/v1/countries.json',
            type: 'get',
            data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
				},
            dataType: 'jsonp',
            success:function(response){
				console.log("respone",response.countries);
                var len = response.countries.length;
					 $("#countries_id").empty();
                     $("#countries_id").append("<option value='All_all'>All</option>"); 
                for( var i = 0; i<len; i++){
                    var id = response.countries[i].iso;
                    var name = response.countries[i].name;
					console.log("countries_id",response.countries[i].iso);

                    $("#countries_id").append("<option value='"+id+"_"+name+"'>"+name+"</option>");

                }
            }
        });
		
        $.ajax({
           // url: Config.api.categoriesurl,
            url: "//beta.roundbob.com/public/api/v1/product-categories.json",
            type: 'GET',
            data: {
				//user_id:"b34a758d762edb799b6c305e58d0ef06"
				},
            dataType: 'jsonp',
            success:function(response){
				console.log("respone");
				console.log("respone",response.productCategories);
                var len = response.productCategories.length;
				console.log("countries",response.productCategories);
			 $("#categories_id").empty();
			$("#categories_id").append("<option value='All_all'>All</option>");	
                for( var i = 0; i<len; i++){
					console.log("category_id",response.productCategories[i]);
					if(typeof response.productCategories[i].name != "undefined"){
						var id = response.productCategories[i].id;
						var name = response.productCategories[i].name;
						console.log("category_id",response.productCategories[i]);
						
						$("#categories_id").append("<option value='"+id+"_"+name+"'>"+name+"</option>");						
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
      'click .continue_to_view_packages' : 'continue_to_view_packages',
	  'keyup #flight_to': 'flight_to',
	  'keyup #flight_from': 'flight_from',

    },

	continue_to_view_packages:function(e){
		var country = $('select[name=countries_selector]').val();
		var catvalue = $('select[name=categories_selector]').val();
		var sort_by_coutries = document.getElementById("option-1");
		var sort_by_category = document.getElementById("option-2");
		console.log("catvalue",catvalue+"-"+country);
		var redirectTo = '';
		  redirectTo = '/surprise';
		if(sort_by_category.checked ){
			redirectTo += '/'+catvalue+'_' + "All_all";
		}else{
			redirectTo += '/All_all_' + country;
		}

		 // redirectTo += '/'+catvalue+'_' + country;
		 // redirectTo += '/'+catvalue+'_' + "All_all";
		  app.router.go(redirectTo);
	},
  });

});
