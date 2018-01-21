define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var _ = require("lodash");

 // var Package = {
  var Popular = {
    // Collections needed for this view
    Collection: require("../popularcollection"),

    // Views needed for this layout
    Views: {
      TopNav: require("../../common/topNav/view"),
      List: require("../popularlist/view"),
     // CountriesSelector: require("../countries/view"),
      TopIconHolder: require("../common/topIconHolder/view"),
     // NotificationView: require("../../notifications/default/view"),
    },
  };


  //var packagesCollection = new Category.Collection();
  var popularCollection = new Popular.Collection();

  module.exports = Backbone.Layout.extend({

    initialize: function(){
      this.typingTimer = null;
    },

    template: require("ldsh!./template"),

    collections:{
      populars: popularCollection,
    //  countries: CountriesCollection
    },

    el: "ContentPopularListView",

    // Add All the view Elements
    views: {
      "topNav": new Popular.Views.TopNav(),
      //"countriesSelector": new Package.Views.CountriesSelector(),
      ".item_nav_e": new Popular.Views.TopIconHolder(),
      ".package-category-container": new Popular.Views.List({ collection: popularCollection }),
    },

    afterRender: function(){
      // Enable DatePicker
      var that = this;
	  
	 /* console.log(this.collections.countries.length);
	  if(this.collections.countries.length >1){
		  
	  }
	  this.collections.countries.each(function(Countries_model) {
		  console.log("countries check"+Countries_model);
	  });
      $(document).ready(function(){
        that.$el.find('.input-daterange').datepicker({
          startDate: new Date(),
          todayHighlight: true
        });
      });*/
	  
		//this.collections.packages.fetch();	
    },

    beforeRender: function(){
		//this.collections.countries.fetch();
    },

    events: {
		//popular_div_id categories_div_id
		'click #popular_div_id': "onPopularclick",
		'click #categories_div_id': "onCategoryclick",
    /*  'submit #hotel-search-form': "onHotelFormSubmit",
      'click .show-ajax': "onHotelFormButtonSubmit",
      'change .select_room': "onSelectRoomChanged",
      'click input#drop-room': "onSelectRoomDropDownClicked",
      'click .close-x': "onSelectRoomDropDownCloseBtnClicked",
      'click input[name=\'rating\']': 'starsLevelChecked',
      'keyup .input-search-by-name': 'setHotelNameFilter',
      'click input[name=\'pricePerNight\']': 'pricePerNightChecked',*/
    },
   /* setHotelNameFilter: function(e){
      clearTimeout(this.typingTimer);
      var that = this;
      this.typingTimer = setTimeout(function(){
        hotelsCollection.filters.name = $(e.target).val();
        that.refreshList();
      }, 1000);
    },*/

   /* pricePerNightChecked: function(e){
      var priceRanges = [];
      $.each($('input[name=\'pricePerNight\']'),function(){
        if($(this).is(':checked')){
          priceRanges.push({
            min:$(this).attr('min'),
            max:$(this).attr('max'),
          });
        }
      });

      hotelsCollection.filters.priceRanges = priceRanges;
      this.refreshList();
    },*/
/*
    starsLevelChecked: function (e) {
        var $target = $(e.target);
        var selected = $target .is(':checked');
        var targetId = $target.attr('id');
        var newStarsLevel = [];
        $.each($('input[name=\'rating\']'),function(){
          if($(this).is(':checked')){
            var _targetId = $(this).attr('id');
            var _starsLevel = Number(_targetId.replace('star',''));
            var _starsLevelHalf = _starsLevel + 0.5;
            if(_starsLevel){
              newStarsLevel.push(_starsLevel);
              newStarsLevel.push(_starsLevelHalf);
            }
          }
        });
        hotelsCollection.filters.starsLevel = newStarsLevel;
        this.refreshList();
    },*/
/*
    refreshList: function(){
      hotelsCollection.trigger('reset'); // Clear the list
      hotelsCollection.trigger('replay');// Load the list again
    },*/
/*
    onHotelFormSubmit: function(e){
        e.preventDefault();
        this.searchForHotels({});
    },
*/
/*
    onHotelFormButtonSubmit: function(){
        this.searchForHotels({});
    },

    onSelectRoomChanged: function(){
      AddRoom('roomSelect', 'add-room'); //add ID of select item.
      addUpGuests();
    },

    onSelectRoomDropDownClicked: function(){
      this.$el.find('.guest-options').toggleClass('show-guest-options');
    },

    onSelectRoomDropDownCloseBtnClicked: function(){
      this.$el.find('.guest-options').removeClass('show-guest-options');
    },
*/
/*
    searchForHotels: function(params){
      this.$el.find('.populate-content').addClass('populate-content-visible');
      var query = {
        checkIn: '2017-11-11',
        checkOut: '2017-11-13',
        destination: 'NYC',
      };

      hotelsCollection.fetch({
        type: "POST",
        data: $.param(query),
        error: function(model,resp) {
          hotelsCollection.trigger("fetchError");
          if(resp.status==404){
            app.notifications.error404();
          }else{
            app.notifications.errorUnknown();
          }
        }
      });
    },*/

    getCached: function(){
      popularCollection.getCached();
    }
  });

});
