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
	  'keydown #flight_to': 'flight_to',
	  'keydown #flight_from': 'flight_from',

    },
	flight_from:function(){
		var UserList = Backbone.Collection.extend({ //Line 11
		  model: User,
		  url: 'https://raw.githubusercontent.com/pkanyerezi/roundbobhelper/master/app/api/airports/airports.json',
		  //C:\wamp\www\roundbobhelperv1\dist\app\api\airports
		  parse: function(response) {
			 
			return response;
		  }
		});
		var SelectionView = Backbone.View.extend({ //Line 19
		  el : $('#user-selection'),
		  render: function() {
			//$(this.el).html("You Selected : " + this.model.get('name')); //Line 22
			return this;
		  },
		});
		var users = new UserList(); //Line 26
		users.fetch({async: false});
		var userNames = users.pluck("name");
		// console.log("data",userNames);
		jQuery.noConflict();
		var flight_from = $('#flight_from');
	   flight_from.autocomplete({ //Line 30
		  source : userNames,
		  minLength : 2,
		  select: function(event, ui){ //Line 33
		  console.log("uixxx",ui);
			var selectedModel = users.where({name: ui.item.value})[0];
			var view = new SelectionView({model: selectedModel});
			view.render();
		  }
		});			
	},
	flight_to:function(){
		var UserList = Backbone.Collection.extend({ //Line 11
		  model: User,
		  url: 'https://raw.githubusercontent.com/pkanyerezi/roundbobhelper/master/app/api/airports/airports.json',
		  //C:\wamp\www\roundbobhelperv1\dist\app\api\airports
		  parse: function(response) {
			 
			return response;
		  }
		});
		var SelectionView = Backbone.View.extend({ //Line 19
		  el : $('#user-selection'),
		  render: function() {
			//$(this.el).html("You Selected : " + this.model.get('name')); //Line 22
			return this;
		  },
		});
		var users = new UserList(); //Line 26
		users.fetch({async: false});
		var userNames = users.pluck("name");
		// console.log("data",userNames);
		jQuery.noConflict();
		var flight_to = $('#flight_to');
	   flight_to.autocomplete({ //Line 30
		  source : userNames,
		  minLength : 2,
		  select: function(event, ui){ //Line 33
		  console.log("uixxx",ui);
			var selectedModel = users.where({name: ui.item.value})[0];
			var view = new SelectionView({model: selectedModel});
			view.render();
		  }
		});			
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
