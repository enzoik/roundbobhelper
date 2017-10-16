define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var _ = require("lodash");

  var Hotel = {
    // Collections needed for this view
    Collection: require("../collection"),

    // Views needed for this layout
    Views: {
      TopNav: require("../../common/topNav/view"),
      List: require("../list/view"),
      TopIconHolder: require("../common/topIconHolder/view"),
      NotificationView: require("../../notifications/default/view"),
    },
  };

  var hotelsCollection = new Hotel.Collection();

  module.exports = Backbone.Layout.extend({

    initialize: function(){
      this.typingTimer = null;
    },

    template: require("ldsh!./template"),

    collections:{
      hotels: hotelsCollection
    },

    el: "ContentListView",

    // Add All the view Elements
    views: {
      "topNav": new Hotel.Views.TopNav(),
      ".item_nav_e": new Hotel.Views.TopIconHolder(),
      ".hotelView": new Hotel.Views.List({ collection: hotelsCollection }),
    },

    afterRender: function(){
      // Enable DatePicker
      var that = this;
      $(document).ready(function(){
        that.$el.find('.input-daterange').datepicker({
          startDate: new Date(),
          todayHighlight: true
        });
      });
    },

    beforeRender: function(){

    },

    events: {
      'submit #hotel-search-form': "onHotelFormSubmit",
      'click .show-ajax': "onHotelFormButtonSubmit",
      'change .select_room': "onSelectRoomChanged",
      'click input#drop-room': "onSelectRoomDropDownClicked",
      'click .close-x': "onSelectRoomDropDownCloseBtnClicked",
      'click input[name=\'rating\']': 'starsLevelChecked',
      'keyup .input-search-by-name': 'setHotelNameFilter',
      'click input[name=\'pricePerNight\']': 'pricePerNightChecked',
    },

    setHotelNameFilter: function(e){
      clearTimeout(this.typingTimer);
      var that = this;
      this.typingTimer = setTimeout(function(){
        hotelsCollection.filters.name = $(e.target).val();
        that.refreshList();
      }, 1000);
    },

    pricePerNightChecked: function(e){
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
    },

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
    },

    refreshList: function(){
      hotelsCollection.trigger('reset'); // Clear the list
      hotelsCollection.trigger('replay');// Load the list again
    },

    onHotelFormSubmit: function(e){
        e.preventDefault();
        this.searchForHotels({});
    },

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
    },

    getCached: function(){
      hotelsCollection.getCached();
    }
  });

});
