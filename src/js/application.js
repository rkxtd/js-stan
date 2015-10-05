var $ = require('jquery');
var Application = function() {
    console.log('New Instance created');
};

Application.prototype = {
    run: function() {
        console.log('Application started');
        $('.js-app').html(app.locale.get('message.welcome'));

        return 0;
    }
};

module.exports = Application;