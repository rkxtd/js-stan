window.app = window.app || /* istanbul ignore next */ {};

var base = require('./application'),
    config = require('../config/options'),
    i18n = require('./translate'),
    translations = require('../i18n/*', {mode: 'expand'}),
    currentTranslation = require('../i18n/' + window.app.options.locale + '.js');

window.app.runtime = base;
window.app.runtime.startApplication();