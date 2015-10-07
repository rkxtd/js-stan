var options;

(function() {
    var app = this;
    var _ = require('lodash');

    options = app.options = app.options || /* istanbul ignore next */ {};

    app.options = _.extend(app.options, {
        appName     : 'Application',
        version     : '0.1.0',
        locale      : 'en_us',
        logLevel    : 10,
        basePath    : '',
        selectors   : {
            app             : '.js-app',
            container       : '.js-container',
            navigationView  : '.js-navigation-view',
            spinner         : '.js-spinner',
            messages        : '.js-messages'
        },
        images      : {
            baseUrl         : 'http://imagecache.app.com/',
            placeholderUrl  : '/images/placeholder.jpg',
            sizes   : {
                thumbPick   : '100x100',
                thumbSmall  : '136x136',
                thumbMedium : '152x152',
                thumbBig    : '205x205',
                thumbGallery: '500x500'
            }
        }
    });

}).call(window.app = window.app || /* istanbul ignore next */ {});

module.exports = options;