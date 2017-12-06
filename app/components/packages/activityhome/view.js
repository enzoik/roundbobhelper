define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var _ = require("lodash");

  var Package = {
    // Collections needed for this view
    Collection: require("../collection"),

    // Views needed for this layout
    Views: {
      TopNav: require("../../common/topNav/view"),
      List: require("../activitylist/view"),
      //CountriesSelector: require("../countries/view"),
    //  CountriesSelector: require("../countrieshome/view"),
      TopIconHolder: require("../common/topIconHolder/view"),
     // NotificationView: require("../../notifications/default/view"),
    },
  };
  var Country = {
    // Collections needed for this view
    Collection: require("../countriescollection"),

    // Views needed for this layout
    Views: {
    },
  };

  var packagesCollection = new Package.Collection();
  var CountriesCollection = new Country.Collection();

  module.exports = Backbone.Layout.extend({

    initialize: function(){
      this.typingTimer = null;
	  console.log("initializing view",this.collections.packages);

    },

    template: require("ldsh!./template"),

    collections:{
      packages: packagesCollection,
      //countries: CountriesCollection
    },

    el: "ContentActivitiesListView",

    // Add All the view Elements
    views: {
      "topNav": new Package.Views.TopNav(),
     // "countriesSelector": new Package.Views.CountriesSelector(),
      ".item_nav_e": new Package.Views.TopIconHolder(),
      ".package-category-container": new Package.Views.List({ collection: packagesCollection }),
    },

    afterRender: function(){
		//this.collections.packages.url = 
		//http://localhost/roundbobhelperv1/dist/#surprise/c746/5900186
		//http://localhost/roundbobhelperv1/dist/#surprise/5900165_Honeymoon_1_Uganda/2017-12-20_2017-12-20_round_s/m/adlts_1_chldn_0_infnts_0/email/m_mail/m_client/m_summary/mydetails/results/packages
		var current_url  = window.location.href.toString();	
		var category_id = current_url.split("#activities")[1].split('/')[1].split("_")[0];
		var country_id = current_url.split("#activities")[1].split('/')[1].split("_")[2];
		var that = this;
		console.log("category_id",category_id);
		if(category_id == '5900186' ){
			console.log("whattoshow","activities");
			that.collections.packages.fetch({
			type: "GET",
				data: {
					category: category_id,
					keyword: '',
					subcategory: '',
					key:'destinations',
					user_id:'eb94fb88074d11c2e1561653b07fd914',
					un:'pkanyerezi',
					pw:'210013634',
					page:1,
					start:0,
					limit:50,
					//callback:'jQuery110106543720210892339_1509692080823',
					//_:'1509692080826'
				},
				error: function(model,resp) {
				  that.collections.packages.trigger("fetchError");
				  if(resp.status==404){
					app.notifications.error404();
				  }else{
					app.notifications.errorUnknown();
				  }
				}
			});
		}else{
			console.log("whattoshow","packages");
			that.collections.packages.fetch({
			type: "GET",
				data: {
					country_id: that.country_id,
					category: category_id,
					keyword: '',
					subcategory: '',
					key:'destinations',
					user_id:'eb94fb88074d11c2e1561653b07fd914',
					un:'pkanyerezi',
					pw:'210013634',
					page:1,
					start:0,
					limit:50,
					//callback:'jQuery110106543720210892339_1509692080823',
					//_:'1509692080826'
				},
				error: function(model,resp) {
				  that.collections.packages.trigger("fetchError");
				  if(resp.status==404){
					app.notifications.error404();
				  }else{
					app.notifications.errorUnknown();
				  }
				}
			});
		}
		

    },

    beforeRender: function(){
		//this.collections.packages.trigger('reset');
      /*var that = this;
	  this.collections.packages.on('add', this.render, this);
	  this.collections.packages.on('reset', this.render, this);
	  this.collections.packages.on('sync', this.render, this);
	  this.render();*/
    },

    events: {
    },

    getCached: function(){
      //packagesCollection.getCached();
	}
  });

});
