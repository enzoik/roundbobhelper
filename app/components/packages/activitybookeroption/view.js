define(function(require, exports, module) {
  "use strict";

  var app = require("app");
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
		$('#go_backward_btn').show();
		$('#go_forward_btn').show();
		var current_url  = window.location.href.toString();
		var did = current_url.split("#activities")[1].split("/")[2].split("_");
		console.log("length",did.length);
		if(did.length < 6){
			$("#view-activity-list").show();
		}else{
			
			$("#view-activity-list").hide();
		}

	},
	events: {
      'click .email_quotationactivity' : 'email_quotation',
      'click .call_clientactivity' : 'call_client',
      'click .available_activities' : 'available_activities',
    },
	email_quotation:function(){
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#activities")[1]);
		var url_ = current_url.split("#activities")[1];
		var splitted = current_url.split("#activities")[1].split("/");
		//var last_spliter = current_url.split("#flights")[1].split("/");
		var last_check = "";
		if(current_url.split("#activities")[1].split("/").length > 2){
			var last_spliter = current_url.split("#activities")[1].split("/")[2];
			 last_check = last_spliter[last_spliter.length - 1];				
		}
		//(YJB) BARCELONA _( Gwangju Korea_Economy/2017-11-21_2017-11-30_round_m/m/adlts_1_chldn_0_infnts_0/email/email	
		console.log("last_checker",last_check);
		var redirectTo = '';
		if(last_check =="email" || last_check =="sent_to" ){
			
		}else if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			 redirectTo = '/activities';
			//redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + splitted[1];
			redirectTo += '/' + splitted[2];
			redirectTo += '/' + splitted[3];
			redirectTo += '/' + splitted[4];
			redirectTo += '/' + "email";
			app.router.go(redirectTo);	
		}else{
//Spain_(MWX) Mua/2017-11-14__oneway_s/s/single/email/sdng_mail/p234/sent_to
			 redirectTo = '/activities';
			redirectTo += '/' + splitted[1];
			redirectTo += '/' + splitted[2];
			redirectTo += '/' + "s/single/email/sdng_mail/p234/sent_to";
			
		app.router.go(redirectTo);	
		}
	
	},
	call_client:function(){
		var current_url  = window.location.href.toString();
		console.log(current_url.split("#activities")[1]);
		var url_ = current_url.split("#activities")[1];
		//hhh_rf_Economy/2017-09-17_2017-10-17_round_m/m/2017-09-17_2017-10-17_round_m/m
		//(YJB) BARC/2017-11-23_2017-11-30_round_m/m/adlts_1_chldn_0_infnts_0/call/true_/call/true_
		var splited = current_url.split("#activities")[1].split("/");
		var redirectTo = '/activities';
		if(url_.split('/')[3] == "m"){
			console.log("many travellers");
			redirectTo += '/'+splited[1];
			redirectTo += '/'+splited[2];
			redirectTo += '/'+splited[3];
			redirectTo += '/'+splited[4];
			//redirectTo += current_url.split("#flights")[1];
			redirectTo += '/' + "call/true_";
			console.log("multiple",redirectTo);
			console.log("mmmmm",url_.split('/')[3]);
		}else{
			//redirectTo += current_url.split("#flights")[1];
			//redirectTo += '/' + "call/true_";
			//http://localhost/roundbobhelperv1/dist/#flights/(YJE) ALICANTE RAIL ALC, Al/2017-11-08_2017-11-20_round_s/s/single/true_/calling/sen_to
			//console.log("multiple",redirectTo);
			redirectTo += '/'+splited[1];
			redirectTo += '/'+splited[2];
			console.log("mmmmm",url_.split('/')[3]);
			//destination_location_/:flightpickdates_/:travelpeople_/:no_of_travelers_/:quotation_media_/:calling/:call_one
			//travelpeople_:"s",no_of_travelers_:"single",quotation_media_:"true_",calling:"calling",call_one:"sen_to
			redirectTo += '/' + "s/single/true_/calling/sen_to";	
		}
//http://localhost/roundbobhelperv1/dist/#flights/(EBB) Entebbe, Entebbe Uganda_(NBO) Jomo Kenyatta Intl., Nairobi Kenya_Economy/2017-11-07_2017-11-13_round_s/2017-11-07_2017-11-13_round_s/2017-11-07_2017-11-13_round_s/s/single/true_/calling/sen_to/s/single/true_/calling/sen_to
		app.router.go(redirectTo);			
	},
	available_activities:function(){
		console.log("Search for activities");
		var current_url  = window.location.href.toString();

		var splitted = current_url.split("#activities")[1];
		var no_ = current_url.split("#activities")[1].split("/")[2].split("_")[3];
		console.log("no_"+current_url.split("#activities")[1].split("/").length );
		var redirectTo="";
		 if(current_url.split("#activities")[1].split("/").length > 8){
			 
		 }else{
			if(no_ == "s"){
				redirectTo = '/activities';
				redirectTo += splitted;
				redirectTo += "/m/adlts_1_chldn_0_infnts_0/email/m_mail/m_client/m_summary/mydetails/results/packages";
			}else if(no_ == "m"){
				redirectTo = '/activities';
				redirectTo += splitted;
				redirectTo += "/email/m_mail/m_client/m_summary/mydetails/results/packages";
			}
			console.log("current_url",splitted);
			app.router.go(redirectTo);			 
		 } 
		
	},
  });

});
