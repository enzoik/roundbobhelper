define(function(require, exports, module) {
  "use strict";

  module.exports = function(options) {
    switch (options.type) {
      case 'success':
        options.icon = options.icon || "icon icon-ok";
        options.theme = 'awesome ok';
        if(options.user) options.theme = 'user ok';
        break;
      case 'error':
        options.icon = options.icon || "icon icon-error";
        options.theme = 'awesome error';
        if(options.user) options.theme = 'user error';
        break;
      case 'warning':
        options.icon = options.icon || "icon icon-warning";
        options.theme = 'awesome yellow';
        if(options.user) options.theme = 'user yellow';
        break;
      case 'info':
        options.icon = options.icon || "icon icon-info";
        options.theme = 'awesome yellow';
        if(options.user) options.theme = 'user blue';
        break;
      default:
        options.icon = options.icon || "icon icon-info";
        options.theme = 'awesome yellow';
        if(options.user) options.theme = 'user blue';
        break;
    }

    var content = {
        title: options.title, //'Your Download is Ready!',
        message: options.message, //'Error 404:<br> Check your internet connection',
        info: options.info, //'my_birthday.mp4',
        icon: options.icon,
    };

    if(options.img) content.img = options.img;// image url
    if(options.user) content.user = options.user; // name of user

    var theme = options.theme || 'awesome ok';

    $.amaran({
        content: content,
        theme: theme,
        position: options.position || 'top right',
    });

    // usage
    // 1. Showing a flash notification with a picture and name of user
    // $.amaran({
    //     content:{
    //         img:'http://api.randomuser.me/0.2/portraits/men/36.jpg',
    //         user:'John Walker',
    //         message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ducimus?'
    //        },
    //     theme:'user green',
    // });
    //
    // 2. Using a custom color theme
    // $.amaran({
    //     content:{
    //         bgcolor:'#27ae60',
    //         color:'#fff',
    //         message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ducimus?'
    //        },
    //     theme:'colorful'
    // });
    //
    // 3. theme tumblr
    // $.amaran({
    //     content:{
    //         title:'Your Download is Ready!',
    //         message:'Error 404:<br> Check your internet connection'
    //     },
    //     theme:'tumblr'
    // });
  };
});
