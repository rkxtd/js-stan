

(function() {
    var app = this,
        config = require('../config/options'),
        translations = require('../i18n/*', {mode: 'expand'}),
        currentTranslation = require('../i18n/' + config.locale + '.js');

    app.locale = app.locale || /* istanbul ignore next */ {};
    app.locale = {
        translations: app.locale.translations,
        get: function(key) {
            return this.translations[key] || key;
        },
        set: function(key, value) {
            this.translations[key] = value;
        }
    };

}).call(window.app = window.app || /* istanbul ignore next */ {});

