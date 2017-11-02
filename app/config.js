require.config({
  paths: {
    // Make vendor easier to access.
    "vendor": "../vendor",

    // Almond is used to lighten the output filesize.
    "almond": "../vendor/bower/almond/almond",

    // Opt for Lo-Dash Underscore compatibility build over Underscore.
    "underscore": "../vendor/bower/lodash/dist/lodash.underscore",

    // Map `lodash` to a valid location for the template loader plugin.
    "lodash": "../vendor/bower/lodash/dist/lodash",

    // Use the Lo-Dash template loader.
    "ldsh": "../vendor/bower/lodash-template-loader/loader",

    // Map remaining vendor dependencies.
    "jquery": "../vendor/bower/jquery/jquery.min",
    "jqueryui": "../vendor/bower/jquery/jquery-ui",
    "backbone": "../vendor/bower/backbone/backbone",
    "bootstrap": "../vendor/bower/bootstrap/dist/js/bootstrap",
    "layoutmanager": "../vendor/bower/layoutmanager/backbone.layoutmanager",
    "collectionCache": "../vendor/backbone.collectioncache",
    // "sweetAlert": "../vendor/bower/sweetalert/lib/sweetalert"
  },

  shim: {
    // This is required to ensure Backbone works as expected within the AMD
    // environment.
	"jqueryui": {
		exports: "$",
		deps: ['jquery']
	},
	"underscore": {
		exports: "_"
	},
    "backbone": {
      // These are the two hard dependencies that will be loaded first.
      deps: ["jquery", "underscore"],

      // This maps the global `Backbone` object to `require("backbone")`.
      exports: "Backbone"
    },

    // Backbone.CollectionCache depends on Backbone.
    "collectionCache": ["backbone"],

    // Twitter Bootstrap depends on jQuery.
    "bootstrap": ["jquery"]
  }
});
