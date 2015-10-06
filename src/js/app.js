window.app = window.app || /* istanbul ignore next */ {};

var base = require('./application'),
    config = require('../config/options'),
    i18n = require('./translate');

window.app.runtime = base;
window.app.runtime.startApplication();
document.write(window.app.runtime.render());