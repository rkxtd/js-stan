window.app = window.app || /* istanbul ignore next */ {};

var base = require('./application'),
    config = require('../config/options'),
    i18n = require('./translate');

app.runtime = base;
app.runtime.startApplication();