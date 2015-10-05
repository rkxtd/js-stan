(function() {
    var app = this;
    app.locale = app.locale || {};
    app.locale = {
        translations: app.locale.translations,
        get: function(key) {
            return this.translations[key];
        },
        set: function(key, value) {
            this.translations[key] = value;
        }
    };

}).call(window.app = window.app || /* istanbul ignore next */ {});

