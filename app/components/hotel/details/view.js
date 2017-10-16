define(function(require, exports, module) {
  "use strict";

  var Layout = require("layoutmanager");
  var app = require("app");

  var Hotel = {
    // Views needed for this layout
    Views: {
      TopNav: require("../../common/topNav/view"),
      TopIconHolder: require("../common/topIconHolder/view"),
    },
  };

  module.exports = Layout.extend({
    template: require("ldsh!./template"),

    // el: 'main',
    el: 'ContentDetailsView',

    views: {
      "topNav": new Hotel.Views.TopNav(),
      ".item_nav_e": new Hotel.Views.TopIconHolder(),
    },

    beforeRender: function() {
      // Modify the data from here
      this.model.set("starsLevelHtml", [
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star yellow"></i>',
        '<i class="icon-star"></i>',
        '<i class="icon-star"></i>'
      ].join('\n'));
    },

    afterRender: function(){

      this.$el.find('#myCarousel').carousel({
        interval: false
      });

      // handles the carousel thumbnails
      this.$el.find('[id^=carousel-selector-]').click( function(){
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.length -1);
        id = parseInt(id);
        $('#myCarousel').carousel(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
      });

      // when the carousel slides, auto update
      this.$el.find('#myCarousel').on('slid', function (e) {
        var id = $('.item.active').data('slide-number');
        id = parseInt(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $('[id=carousel-selector-'+id+']').addClass('selected');
      });

      var linkClass = 'toggleText';
      var textClass = 'displayText';
      var visibilityClass = '-isVisible';
      var container = document.querySelector('.container');
      container.addEventListener('click', function(event) {
        var target = event.target;
        if(target.classList.contains(linkClass)) {
          var sibling = target.nextElementSibling;
          if(sibling && sibling.classList.contains(textClass)) {
            sibling.classList.toggle(visibilityClass, !sibling.classList.contains(visibilityClass));
          }
        }
      });
    },

    events: {
      'click .more_plus': 'showRoomsOnly',
      'click .showAll': 'showAll',
      'click #map_show': 'onShowMapBntClicked',
      'click .close-map': 'onCloseMapBntClicked',
    },

    showRoomsOnly: function(e){
      // this.$el.find('#more_sign').toggleClass('icon-angle-down');
      // this.$el.find('.hotel_reveal_info').toggleClass('hide');

      this.$el.find('.hotel_reveal_info').hide();
      this.$el.find('#more_plus').addClass('showAll').removeClass('more_plus');
    },

    showAll: function(e){
      this.$el.find('.hotel_reveal_info').show();
      this.$el.find('#more_plus').removeClass('showAll').addClass('more_plus');
    },

    onShowMapBntClicked: function(){
      this.$el.find('.screen-overlay').removeClass('hide');
    },

    onCloseMapBntClicked: function(){
      this.$el.find('.screen-overlay').addClass('hide');
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
