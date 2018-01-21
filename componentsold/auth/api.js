define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  module.exports = {
    /**
     * [Get] getUserToken
     * get a token to authenticate the user
     * on requests that require Authentication
     *
     * @param params - object defining the data[username, password]
     * @param callback - Callback function for sync requests
     */
    getUserToken: function(params, callback){
      // Code - Send Https Request for auth-token

      // Set the authToken
      var authToken = 'randon-token-for-testing-purposes';
      app.store.auth = {
        username: username,
        authToken: authToken,
      };
      app.localStorage.saveState();

      // Save the token in the local storage

      //execute callback with the auth-token
      if(callback){
        callback(authToken);
      }
    },

  };
});
