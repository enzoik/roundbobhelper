define(function(require, exports, module) {
  "use strict";

  module.exports = {
    get: function(options, callback){
      callback(this.request(options,{
        url: options.url,
        data: options.data,
      }));
    },

    post: function(options, callback){
      callback(this.request(options,{
        url: options.url,
        data: options.data,
        type: "POST",
      }));
    },

    request: function(options){
      options.type = data.type || "GET";
    }
  };
});
