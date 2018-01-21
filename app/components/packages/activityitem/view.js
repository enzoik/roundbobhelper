define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

  module.exports = Layout.extend({
    template: require("ldsh!./template"),
    initialize: function(){
		//this.model.on('change', this.render, this);
    },
    // el: false,

    beforeRender: function() {
      // Modify the data from here
     /* this.model.set("starsLevelHtml", [
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star"></i>',
        '<i class="icon-star"></i>'
      ].join('\n'));*/

      // Make the image links protocol friendly if they are not HTTPS
     // this.model.set("thumb", this.model.get("thumb").replace("http:",""));
	 console.log("object",this.model.attributes);
	 var wallet_percentage =(parseFloat(this.model.attributes.display_price)/1000)*100 ;
	 this.model.set("name",this.model.attributes.name);
	 this.model.set("cost","USD "+this.model.attributes.display_price);
	 this.model.set("location",this.model.attributes.country_name);
	 this.model.set("wallet_position",wallet_percentage);
	 
	 
	 this.model.set("brief_description",this.model.attributes.Destination.brief_description);
	 this.model.set("image_file_large",""+this.model.attributes.display_img);
	 this.model.set("image_file",""+this.model.attributes.display_img);
	 
	 
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

    events: {
      click: "onPackageItemSelected"
    },
//Reservations123!@#
   onPackageItemSelected: function(ev) {
		
    var id = this.model.cid;    
	var resultIndex = this.model.attributes.id;
//http://localhost/roundbobhelperv1/dist/#surprise//4_City%20getaway_1_Uganda/2017-12-12_2017-12-27_round_s/m/adlts_1_chldn_0_infnts_0/email/m_mail/m_client/m_summary/mydetails/results/packages
//http://localhost/roundbobhelperv1/dist/#surprise/5900169_Christmas%20Holiday_1_Uganda/2017-12-20_2017-12-28_round_m/m/adlts_1_chldn_1_infnts_0/email/m_mail/m_client/m_summary/mydetails/results/packages
	
	var current_url  = window.location.href.toString();
	var splitted = current_url.split("#activities")[1].split("/");   
	var sorter = splitted[1];
	var date = splitted[2];
	var peope =splitted[3]; 
	var no_of_peope =splitted[4]; 
	var media =splitted[5]; 
	var m_media =splitted[6]; 
	var m_client =splitted[7]; 
	var m_summary =splitted[8]; 
	var my_details =splitted[9]; 
	var results =splitted[10]; 
	var packages =splitted[11]; 
	app.router.go("activities",sorter,date,peope,no_of_peope,media,m_media,m_client,m_summary ,my_details,results,packages,id, resultIndex);

      return false;
    },

  });
});
