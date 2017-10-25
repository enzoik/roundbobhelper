define(function(require, exports, module) {
  "use strict";

  var app = require("app");
    var User = Backbone.Model.extend({}); //Line 9

    var UserList = Backbone.Collection.extend({ //Line 11
      model: User,
      url: 'http://localhost/roundbobhelperv1/dist/app/api/airports/airports.json',
      parse: function(response) {
		 
        return response;
      }
    });
    var SelectionView = Backbone.View.extend({ //Line 19
      el : $('#user-selection'),
      render: function() {
        $(this.el).html("You Selected : " + this.model.get('name')); //Line 22
        return this;
      },
    });
    var users = new UserList(); //Line 26
    users.fetch({async: false});
    var userNames = users.pluck("name");
	 console.log("data",userNames);
	jQuery.noConflict();
	//console.log( $("#flight_from"));
	console.log( $("#flight_from"));
    $("#flight_from").autocomplete({ //Line 30
      source : userNames,
      minLength : 1,
      select: function(event, ui){ //Line 33
	  console.log("uixxx",ui);
        var selectedModel = users.where({name: ui.item.value})[0];
        var view = new SelectionView({model: selectedModel});
        view.render();
      }
    });	
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
	afterRender: function(){
		$('#selected_to').hide();
		$('#selected').hide();
	},
	events: {
      'click .continue_to_flight_pick_dates' : 'continue_to_flight_pick_dates',

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
			
			var economy = document.getElementById("option-1");
			var business = document.getElementById("option-2");
			var first_class = document.getElementById("option-3");
			var flight_class="";
			if(economy.checked) {
				flight_class="Economy";
			}else if(business.checked){
				flight_class="Business";
			}else if(first_class.checked){
				flight_class="First";
			}
		    var redirectTo = '/flights';
		  redirectTo += '/' + flight_from+"_"+flight_to+"_"+flight_class;
		 

		  app.router.go(redirectTo);
		}
	},
  });

});
