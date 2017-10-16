define(function(require, exports, module) {
  "use strict";

  module.exports = function(options) {
    switch (options.type) {
      case 'success':
        swal(options.title, options.message, "success");
        break;
      case 'error':
        swal(options.title, options.message, "error");
        break;
      case 'warning':
        swal(options.title, options.message, "warning");
        break;
      case 'info':
        swal(options.title, options.message, "info");
        break;
      default:
        swal(options.title, options.message, "info");
        break;
    }
  };
});
