define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

  var Packages = {
    // Views needed for this layout
    Views: {
      TopNav: require("../../common/topNav/view"),
      TopIconHolder: require("../common/topIconHolder/view"),
    },
  };

  module.exports = Layout.extend({
    template: require("ldsh!./template"),

    // el: 'main',
    el: 'ContentPackageDetailsView',

    views: {
      "topNav": new Packages.Views.TopNav(),
      ".item_nav_e": new Packages.Views.TopIconHolder(),
    },

    beforeRender: function() {
      // Modify the data from here
     /* this.model.set("starsLevelHtml", [
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star"></i>',
        '<i class="icon-star"></i>'
      ].join('\n'));*/
		//console.log("package details after render",this.model);
		
			/*$.ajax('http://localhost/client-backbone-js-ui-repo-fork/app/api/destinationdetails/roundbob_get_destination_details.php', {
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
			}
		}).then(function(response) {
			// handle requested data from server
			console.log("response",response);
		});*/
		var that = this;
		//that.model.set("brief","loading...");
		//console.log("this model",that.model.attributes.Destination.id);
		var destination_id = that.model.attributes.Destination.id;
		$.ajax({
		  dataType: 'jsonp',
		  url: "http://m.roundbob.com/API/roundbob_get_destination_details.php?user_id=b34a758d762edb799b6c305e58d0ef06&did="+destination_id,
		 	data: {
				user_id:"b34a758d762edb799b6c305e58d0ef06"
			},
		  success: success
		});
		function success(data) {
		  // do something with data, which is an object
		  console.log("response data",data);
		  var info_data = data.Response.destination_details.Destinations.Destination.brief_description;
		  var ref_number = data.Response.destination_details.Destinations.Destination.ref_number;
		  
		  that.model.set("brief",info_data);
		  $('.brief-info').html(info_data);
		  $('.ref-number-info').html(ref_number);
		}
    },

    afterRender: function(){
		
    },

    events: {
      'click .more_plus': 'showRoomsOnly',
      'click .showAll': 'showAll',
      'click #map_show': 'onShowMapBntClicked',
      'click #submit_booking_details': 'submit_booking_details',
      'click .close-map': 'onCloseMapBntClicked',
	  'mouseover #travel_date' : 'travel_date',
    },
	travel_date:function(e){
		var view = this;
		jQuery.noConflict();
		$(e.currentTarget).datepicker({
		  minDate:'2',
		  dateFormat: 'dd-mm-yy',
		  defaultDate:view.selectedDate,
		  onSelect:function(dateText,datePicker) {
			console.log('onSelect',dateText);
			view.selectedDate = dateText;  
			//$("#departure-date").val("");
		  }
		});		
	},
	submit_booking_details:function(){
		console.log("submit details");
		var e = document.getElementById("infants_id");
		var infants = e.options[e.selectedIndex].value;
		var a = document.getElementById("adults_id");
		var adults = a.options[e.selectedIndex].value;
		var c = document.getElementById("children_id");
		var children = c.options[e.selectedIndex].value;
		var client_name_id = document.getElementById("client_name_id").value;
		var travel_date = document.getElementById("travel_date").value;
		var phone_number = document.getElementById("phone_number").value;
		var client_email = document.getElementById("client_email").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var data_info = {};
		data_info.DepartureDate = travel_date;
		 var jsonString= JSON.stringify(data_info);
		console.log("infants "+infants+" adults "+adults+" children "+children);

		if(client_name_id === null || client_name_id === undefined || client_name_id === ""){
			swal(
			  'Empty',
			  ' Name Field Should not Be Left Empty',
			  'error'
			);			
		}else if(travel_date === null || travel_date === undefined || travel_date === "" ){
			swal(
			  'Empty',
			  'Departure Date Field Should not Be Left Empty',
			  'error'
			);				
		}else if(phone_number === null || phone_number === undefined || phone_number === "" ){
			swal(
			  'Empty',
			  'Phone Number Field Should not Be Left Empty',
			  'error'
			);				
		}else if(client_email === null || client_email === undefined || client_email === ""|| !filter.test(client_email) ){
			swal(
			  'Empty',
			  'Provide a valid email e.g bob@roundbob.com',
			  'error'
			);				
		}else{
				$("#submit_booking_details").attr("disabled","disabled");
				$.ajax({
					url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.json',
					headers: { "Accept-Encoding" : "gzip" },
					type: 'POST',
					dataType: 'json',//be sure you are receiving a valid json response or you'll get an error
					data: jQuery.param({
						email: client_email,
						phone : phone_number,
						name : client_name_id,
						request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
						adults : adults,
						children : children,
						infants : infants,
						meta_data :jsonString,
						}) ,
				})
				.done(function(response) {
					console.log("success");
					console.log(response);
					swal({
					  position: 'center',
					  type: 'success',
					  title: 'Your Request has been sent successfully',
					  showConfirmButton: false,
					  timer: 1500
					});

					$('#travel_date').text("");
					$('#phone_number').text("");
					$('#client_email').text("");
					$('#client_name_id').text("");
				})
				.fail(function() {
					console.log("error");
						$("submit_activity_details").removeAttr('disabled');
					$('#travel_date').text("");
					$('#phone_number').text("");
					$('#client_email').text("");
					$('#client_name_id').text("");
						console.log("error");
						/*swal(
						  'Failed',
						  'Your request has not been sent!',
						  'error'
						);*/
				})
				.always(function() {
					console.log("complete");
					swal({
					  position: 'center',
					  type: 'success',
					  title: 'Your Request has been sent successfully',
					  showConfirmButton: false,
					  timer: 1500
					});
				});
			/*$.ajax({
				url: 'http://customrequests.roundbob.com/public-api/custom-requests/add.jso',
				headers: { "Accept-Encoding" : "gzip" },
				type: 'POST',
				dataType: 'json',
				//type: 'http://www.roundbob.com/public-api/custom-requests/add.json',
				data: jQuery.param({
					email: client_email,
					phone : phone_number,
					name : client_name_id,
					request_type : "PACKAGE", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
					adults : adults,
					children : children,
					infants : infants,
					meta_data :jsonString,
					}) ,
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				success: function (response) {
					  swal({
						type: 'success',
						html: 'Reply will be sent to' + email
					  });
				},
				error: function () {
					console.log("error");
				}
			});	*/			
		}		 
		 
	/*	swal({
		  title: 'Input email address',
		  input: 'email',
		  inputPlaceholder: 'Enter your email address'
		}).then(function (email) {

		$.ajax({
			url: 'http://www.roundbob.com/public-api/custom-requests/add.json',
			type: 'POST',
			dataType: 'jsonp',
			//type: 'http://www.roundbob.com/public-api/custom-requests/add.json',
			data: jQuery.param({
				email: email,
				phone : phone,
				name : name,
				request_type : "FLIGHT", //[PACKAGE,FLIGHT,HOTEL,ACTIVITY]
				adults : adults,
				children : child,
				infants : infants,
				//description  : "hello2"
				//price   : "hello2"
				//currency    : "hello2"
				//meta_data    : "hello2"
				//respond_via    : "hello2"[email, phone, whatsapp]
				meta_data :jsonString,
				}) ,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function (response) {
				  swal({
					type: 'success',
					html: 'Reply will be sent to' + email
				  });
			},
			error: function () {
				console.log("error");
			}
		});
		});*/
	},
 
    serialize: function() {
      return {
        model: this.model,
        // repo: this.options.repo,
        // user: this.options.user
      };
    },

    getStarsLevel: function(){
      return this.model.starsLevel;
    },

  });

});
