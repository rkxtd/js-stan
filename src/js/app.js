window.app = window.app || /* istanbul ignore next */ {};

var base = require('./application'),
    config = require('../config/options'),
    i18n = require('./translate');

window.app.runtime = base;
window.addEventListener("hashchange", window.app.runtime.onNavigate, false);
window.app.runtime.startApplication();