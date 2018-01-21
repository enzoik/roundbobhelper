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
console.log("attributes", that.model.attributes);		
		var destination_id = that.model.attributes.id;
		var name = that.model.attributes.name;
		var display_price = that.model.attributes.display_price;
		var country_name = that.model.attributes.country_name;
		var city_name = that.model.attributes.city_name;
		  var current_url  = window.location.href.toString();
		  var splitted = current_url.split("#surprise")[1].split("/");
		  var no_of_people = splitted[4].split("_");
		  var adults = no_of_people[1];
		  var children = no_of_people[3];
		  var infant = no_of_people[5];
	

		$.ajax({
		  dataType: 'jsonp',
		  //dataType: 'json',
		  //url: "//m.roundbob.com/API/roundbob_get_destination_details.php?user_id=b34a758d762edb799b6c305e58d0ef06&did="+destination_id,
		 // url: "http://localhost/roundbobhelperv1/app/api/raw/packagedetails.php",
		  url: "//beta.roundbob.com/public/api/v1/products/details/"+destination_id+".json",
		  data: {
				//user_id:"b34a758d762edb799b6c305e58d0ef06"
			},
		  success: success
		});
		function success(data) {
		  // do something with data, which is an object
		  console.log("response data",data);
		  console.log("response data",data.productContent.content+"");
		  var info_data = data.productContent.content+"";
		  var ref_number = data.productContent.id;
		  var cost = display_price;
		  
		  
		  var double_book = cost * 2;
		  var tripple_book = cost * 3;
		  var total_people = Number(adults)+Number(children)+Number(infant);
		  console.log("total_people"+total_people);
		  console.log("total_people"+cost);
		  var total_cost = total_people*cost;
		  Packages.info = name;
		  Packages.did = destination_id;
		 //http://localhost/roundbobhelperv1/dist/#surprise/1_Honey%20Moon_All_all/2018-01-23__oneway_m/m/adlts_2_chldn_2_infnts_1/email/m_mail/m_client/m_summary/mydetails/results/packages/c139/5
		that.model.set("brief",info_data);
		var adults_id = document.getElementById("adult_id");
		var children_id = document.getElementById("childrens_id");
		var infants_id = document.getElementById("infants_ids");

		var opt = document.createElement('option');
			opt.value = adults;
			opt.innerHTML = adults;
			opt.selected = true;
			adults_id.appendChild(opt);
		var opt1 = document.createElement('option');
			opt1.value = children;
			opt1.innerHTML = children;
			opt1.selected = true;
			children_id.appendChild(opt1);
		var opt2 = document.createElement('option');
			opt2.value = infant;
			opt2.innerHTML = infant;
			opt2.selected = true;
			infants_id.appendChild(opt2);
		  var dates = splitted[2].split("_")[0];
		  console.log("dates",no_of_people);
		  console.log("dates",adults+"-"+children+"-"+infant);
		  $('#travel_date').val(dates);
		  
			if(localStorage.getItem('my_user_details')){
				var retrieveduserdetails = JSON.parse(localStorage.getItem('my_user_details'));
				$('#client_name_id').val(retrieveduserdetails.name);
				$('#client_email').val(retrieveduserdetails.email);
				$('#phone_number').val(retrieveduserdetails.watsapp);
			}else{
				console.log("Not Found",'Not defined');
			}		  
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
		//$('#info_card').hide();
		//$('#info_card_title').hide();
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
		/*var current_url  = window.location.href.toString();
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
			}*/
		var e = document.getElementById("infants_ids");
		var infants = e.options[e.selectedIndex].value;
		var a = document.getElementById("adult_id");
		console.log("selected",a.options[a.selectedIndex].value);
		var adults = a.options[a.selectedIndex].value;
		var c = document.getElementById("childrens_id");
		var children = c.options[c.selectedIndex].value;
		var client_name_id = document.getElementById("client_name_id").value;
		var travel_date = document.getElementById("travel_date").value;
		var phone_number = document.getElementById("phone_number").value;
		var client_email = document.getElementById("client_email").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var final_info = {};
		final_info.email=client_email;
		final_info.phone=phone_number;
		final_info.name=client_name_id;
		final_info.request_type="PACKAGE";
		final_info.adults=adults;
		final_info.children=children;
		final_info.infants=infants;
		var data_info = {};
		data_info.DepartureDate = travel_date;
		 var jsonString= JSON.stringify(data_info);
		 final_info.meta_data = jsonString;
		 var finaljson = JSON.stringify(final_info);
		console.log("finaljson",finaljson);
		 
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
					//url: '//customrequests.roundbob.com/public-api/custom-requests/add.json',
					url: '//beta.roundbob.com/public/api/v1/custom-requests/add.json',
					headers: { "Accept-Encoding" : "gzip" },
					contentType : 'application/json; charset=UTF-8',
					type: 'POST',
					dataType: 'json',//be sure you are receiving a valid json response or you'll get an error
					//data:finaljson,
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
					console.log("status",response.responseStatus.status);
					if(response.responseStatus.status){
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
						app.router.go(redirectTo);						
					}else{
						swal({
						  position: 'center',
						  type: 'error',
						  title: ''+response.responseStatus.message,
						  showConfirmButton: false,
						  timer: 2500
						});		
						$("#submit_booking_details").removeAttr('disabled');						
					}

				})
				.fail(function() {
					console.log("error");
						$("submit_activity_details").removeAttr('disabled');
					$('#travel_date').text("");
					$('#phone_number').text("");
					$('#client_email').text("");
					$('#client_name_id').text("");
						console.log("error");
					$('#progress_metre_id').html('<svg height="10" width="100%" style="background:#ccc;"><line x1="0" y1="0" x2="100%" y2="0" style="stroke:#e7e874;stroke-width:20" />  </svg><span class="centage-label">100%</span>');
					
					console.log("complete");
							swal({
							  position: 'center',
							  type: 'error',
							  title: 'Check your internet connection and try again',
							  showConfirmButton: false,
							  timer: 1500
							});				
				})
				.always(function() {
					console.log("complete");
					/*swal({
					  position: 'center',
					  type: 'success',
					  title: 'Your Request has been sent successfully',
					  showConfirmButton: false,
					  timer: 1500
					});*/
					
				});
				
		}		 
		 

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
