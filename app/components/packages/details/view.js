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
	info:"",
	did:""
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
		var that = this;
			console.log("that.model",that.model);
			
			
		var destination_id = that.model.attributes.Destination.id;
		$.ajax({
		  dataType: 'jsonp',
		  url: "//m.roundbob.com/API/roundbob_get_destination_details.php?user_id=b34a758d762edb799b6c305e58d0ef06&did="+destination_id,
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
		  var cost = data.Response.destination_details.Destinations.Destination.cost;
		  
		  var current_url  = window.location.href.toString();
		  var splitted = current_url.split("#surprise")[1].split("/");
		  var no_of_people = splitted[4].split("_");
		  var adults = no_of_people[1];
		  var children = no_of_people[3];
		  var infant = no_of_people[5];
		  
		  var double_book = cost * 2;
		  var tripple_book = cost * 3;
		  var total_people = Number(adults)+Number(children)+Number(infant);
		  console.log("total_people"+total_people);
		  console.log("total_people"+cost);
		  var total_cost = total_people*cost;
		  Packages.info = data.Response.destination_details.Destinations.Destination.name;
		  Packages.did = data.Response.destination_details.Destinations.Destination.id;
		 // http://localhost/roundbobhelperv1/dist/#surprise/5900169_Christmas Holiday_1_Uganda/2017-12-12_2017-12-26_round_m/m/adlts_1_chldn_2_infnts_1/email/m_mail/m_client/m_summary/mydetails/results/packages/c169/5899d4ed-5e44-4fd4-91d4-1b1089ac00e9_090569001486476525-20170207050845-1486476525
		  that.model.set("brief",info_data);
		  $('.brief-info').html(info_data);
		  $('.ref-number-info').html(ref_number);
		  $('.package-item-total-price').html(total_cost);
		  $('.individualbasis').html("On single basis ($"+cost+")");
		  $('.indoublebasis').html("On double basis ($"+double_book+")");
		  $('.tripplebasis').html("On tripple basis ($"+tripple_book+")");
		  
		  $('#numberOfAdults').html("<span>Adult(s): </span>"+ adults);
		  $('#numberOfChildren').html("<span>Child(ren):</span>"+ children);
		  $('#numberOfInfants').html("<span>Infant(s): </span>"+ infant);
		  
		  
		  $('#package-single-basis').val(cost);
		  $('#package-double-basis').val(double_book);
		  $('#package-tripple-basis').val(tripple_book);
		}
    },

    afterRender: function(){
		$('#info_card').hide();
		$('#info_card_title').hide();
    },

    events: {
      'click .more_plus': 'showRoomsOnly',
      'click .showAll': 'showAll',
      'click #map_show': 'onShowMapBntClicked',
      'click #submit_booking_details': 'submit_booking_details',
      'click #submit_to_book_now': 'submit_to_book_now',
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
	submit_to_book_now:function(){
			swal(
			  'Comming Soon',
			  'This functionality is still being tested',
			  'info'
			);			
	},
	submit_booking_details:function(){
		console.log("submit details");
		//http://localhost/roundbobhelperv1/dist/#surprise/5900165_Honeymoon_1_Uganda/2017-12-13_2017-12-27_round_s_%202%20nights%20Chobe%20Honeymoon_582327d0-b3c0-4167-93b1-11cc89ac00e9_242169001478698960-20161109044240-1478698960
		var current_url  = window.location.href.toString();
		var splitted = current_url.split("#surprise")[1].split("/");
		var sorter = splitted[1];
		var dates = splitted[2];
		var redirectTo="";
		var people_booking =dates.split("_")[3];
		var no_of_people = splitted[4];
			if(people_booking === "s"){
			  redirectTo = '/surprise';
			  redirectTo += '/'+sorter;
			  redirectTo += '/' + dates+"_"+Packages.info+"_"+Packages.did;	
			  app.router.go(redirectTo);			  
			}else{
				var people_symb=splitted[3];
			  redirectTo = '/surprise';
			  redirectTo += '/'+sorter;
			  redirectTo += '/' + dates+"_"+Packages.info+"_"+Packages.did;
			  redirectTo += "/m/"+no_of_people;
			 console.log("single_view",redirectTo);
			  app.router.go(redirectTo);
			}
		/*var e = document.getElementById("infants_id");
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
				var redirectTo = '';
				$.ajax({
					url: '//customrequests.roundbob.com/public-api/custom-requests/add.json',
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
					app.router.go(redirectTo);
				});
				
		}*/		 
		 

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
