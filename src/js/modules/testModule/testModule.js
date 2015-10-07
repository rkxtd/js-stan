module.exports = (function() {
    var sandbox,
        helpers,
        config;
    var publicScope = {};
    var privateScope = {};
    var me = this;
    var translations = require('./i18n/*.js', {mode: 'expand'});

    publicScope.init = function(localConfig) {
        config = localConfig;
        helpers.Logger.log('Hi this is module 1');
        sandbox.listen('module.update', privateScope.moduleUpdate, me);
    };

    publicScope.loadTranslations = function() {
        return require('./i18n/' + app.options.locale + '.js');
    };

    publicScope.destroy = function() {
        sandbox.helpers.Logger.log('Module 1 sath: Goodbye');
    };

    privateScope.moduleUpdate = function(data) {
        helpers.Logger.log('This is testModule1.moduleUpdate event.' + data);
        helpers.Logger.log(app.locale.get(config.id + '__welcome'), {}, 5);
    };
    return function(localSandbox, localHelpers) {
        sandbox = localSandbox;
        helpers = localHelpers;

        return publicScope;
    };
}());