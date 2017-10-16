define(function(require, exports, module) {
  "use strict";

  var _             = require("lodash"),
      $             = require("jquery"),
      Backbone      = require("backbone"),
      Layout        = require("layoutmanager"),
      // Radio         = require('vendor/bower/backbone.radio/src/backbone.radio'),

      localStorage  = require("./helpers/localStorage");

  // Alias the module for easier identification.
  var app = module.exports;

  // The root path to run the application through.
  app.root = "/";

  // Create LocalStorageObject.
  app.store = localStorage;
  app.store.loadState();

  // API endpoint.
  app.api = "https://api.github.com/";
  app.hotelsApi = "app/api/hotels/";
  app.packagesApi = "app/api/packages/";
  app.countriesApi = "app/api/countries/";
  app.categoriesApi = "app/api/categories/";
  // app.hotelsApi = "http://reacting.azurewebsites.net/app/api/hotels/";

  // attach notificationAlertHelpers
  app.notifications = {
    flash: require("components/notifications/flash"),
    alert: require("components/notifications/alert"),
    error404: function(){
      app.notifications.flash({
          type: 'error', title:"Error", message: 'Request failed!',
          info: 'Check internet connection first!', icon: 'icon icon-network'
      });
    },
    errorUnknown: function(){
      app.notifications.flash({
          type: 'error', title: 'Unexpected Error', message: 'Something happened',
          info: 'Please try again.'
      });
    },
  };

  // attach user
  // app.user = require("components/user/index");
  // app.user.login();

  // Useful defaults for GitHub Viewer.
  _.extend(Backbone.Collection.prototype, {
    cache: false,

    initialize: function(models, options) {
      // Automatically extend in passed options.
      _.extend(this, options);

      // Listen for request and sync events to control the `isRequest` flag.
      this.on({
        request: function() {
          this.isRequest = true;
        },

        sync: function() {
          this.isRequest = false;
        }
      });

      // By default the collection is not in a request.
      this.isRequest = false;
    },
  });

  // _.extend(Backbone.Layout.prototype, {
  //   beforeRender: function(){
  //     $('main').hide();
  //     $('subView').hide();
  //   },
  // });


  // add service worker code here
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker
  //            .register('service-worker.js')
  //            .then(function() { console.log('Service Worker Registered'); });
  // }
});
