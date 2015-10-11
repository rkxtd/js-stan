var ApplicationCore     = (function () {
    var privateScope    = {},
        publicScope     = {},
        extensions      = {
            Sandbox     : require('./core/Sandbox'),
            Translate   : require('./translate')
        },
        helpers         = {
            Exception   : require('./core/exceptions/BaseException'),
            Logger      : require('./core/Logger'),
            Lodash      : require('lodash')
        },
        _ = helpers._;
    var modules         = require('./modules/testModule/**/*Module.js', {mode: 'expand'});

    privateScope.modules = {};

    /**
     * Start application
     * @returns {number}
     */
    publicScope.startApplication = function() {

        helpers.Logger.log('application.started', {}, 3);
        var testModule = require('./modules/testModule/testModule');
        var testModule2 = require('./modules/testModule2/testModule');
        var testModule3 = require('./modules/testModule3/testModule');
        var testModule4 = require('./modules/testModule4/testModule');

        publicScope.registerModule('testModule', testModule);
        publicScope.registerModule('testModule2', testModule2);
        publicScope.registerModule('testModule3', testModule3);
        publicScope.registerModule('testModule4', testModule4);
        publicScope.registerModule('broken-module', null);
        publicScope.startAllModules();

        publicScope.startApplication = function() {
            helpers.Logger.warning('Application is already up and running. You can\'t start it again');

            return 0
        };

        return 0;
    };

    /**
     * Stop Application
     * @returns {number}
     */
    publicScope.stopApplication = function() {
        publicScope.stopAllModules();

        helpers.Logger.log('application.stopped', {}, 3);

        return 0;
    };

    /**
     * Add new module to the system, and make some basic checks
     * @param moduleId
     * @param creator
     */
    publicScope.registerModule = function(moduleId, creator) {
        privateScope.modules[moduleId] = {
            creator: creator,
            instance: null
        }
    };

    /**
     * Starting module based on creator function,
     * and passing sandbox to it
     * @param moduleId {string}
     */
    publicScope.startModule = function(moduleId) {
        var module = privateScope.modules[moduleId];

        if (!publicScope.checkIfModuleExists(moduleId, true)) {
            return 0;
        }

        if (!publicScope.checkIfCreatorFunction(moduleId, module.creator, true)) {
            return 0;
        }

        module.instance = module.creator(new extensions.Sandbox(helpers), helpers);
        if(!publicScope.checkIfModuleInstanceCreated(moduleId, true)) {
            return 0;
        }
        if (!publicScope.checkIfModuleMethodExists(moduleId, 'init', true)) {
            return 0;
        }

        privateScope.loadTranslations(moduleId);
        module.instance.init({
            id: moduleId
        });
    };

    /**
     * run all the modules
     */
    publicScope.startAllModules = function() {
        helpers.Lodash.forEach(privateScope.modules, function(module, moduleId) {
            /* istanbul ignore else */
            if (privateScope.modules.hasOwnProperty(moduleId)) {
                publicScope.startModule(moduleId);
            }
        });
    };

    /**
     * Stop all the modules
     */
    publicScope.stopAllModules = function() {
        helpers.Lodash.forEach(privateScope.modules, function(module, moduleId) {
            /* istanbul ignore else */
            if (privateScope.modules.hasOwnProperty(moduleId)) {
                publicScope.stopModule(moduleId);
            }
        });
    };

    /**
     * Handle destroying modules
     * @param moduleId {string}
     */
    publicScope.stopModule = function(moduleId) {
        var module = privateScope.modules[moduleId];

        publicScope.checkIfModuleExists(moduleId, true);
        if (!publicScope.checkIfModuleInstanceCreated(moduleId)) {
            return ;
        }

        publicScope.checkIfModuleMethodExists(moduleId, 'destroy', true);
        module.instance.destroy();
    };

    /**
     * Check if module creator is function
     * @param moduleId {string}
     * @param creator {function}
     * @param shouldThrowError {boolean}
     * @returns {boolean}
     */
    publicScope.checkIfCreatorFunction = function(moduleId, creator, shouldThrowError) {
        return publicScope.checkModule({
                moduleId: moduleId,
                creator: creator
            },
            shouldThrowError,
            'creatorIsFunction'
        );
    };

    /**
     * @Decorator
     * Check whenewer module was added to modules or not
     * @param moduleId {string}
     * @param shouldThrowError {boolean}
     * @return {boolean | Exception}
     */
    publicScope.checkIfModuleExists = function(moduleId, shouldThrowError) {
        return publicScope.checkModule({
                moduleId: moduleId
            },
            shouldThrowError,
            'moduleExists'
        );
    };

    /**
     * @Decorator
     * Check if instance of the module was already created
     * @param moduleId {string}
     * @param shouldThrowError {boolean}
     * @return {boolean | Exception}
     */
    publicScope.checkIfModuleInstanceCreated = function(moduleId, shouldThrowError) {
        return publicScope.checkModule({
                moduleId: moduleId
            },
            shouldThrowError,
            'instanceCreated'
        );
    };

    /**
     * @Decorator
     * Check if module has in public api declared methods
     * @param moduleId {string}
     * @param method {string}
     * @param shouldThrowError {boolean}
     * @return {boolean | Exception}
     */
    publicScope.checkIfModuleMethodExists = function(moduleId, method, shouldThrowError) {
        return publicScope.checkModule({
                moduleId: moduleId,
                methodName: method
            },
            shouldThrowError,
            'methodExists'
        );
    };

    /**
     * Load module transactions.
     * @param moduleId {string} Required
     */
    privateScope.loadTranslations = function(moduleId) {
        var module = privateScope.modules[moduleId];

        publicScope.checkIfModuleExists(moduleId, true);
        publicScope.checkIfModuleInstanceCreated(moduleId, true);

        if (publicScope.checkIfModuleMethodExists(moduleId, 'loadTranslations')) {
            helpers.Lodash.forEach(module.instance.loadTranslations(), function(value, key) {
                app.locale.set(moduleId + '__' + key, value);
            });
        }
    };

    /**
     * Actual implementation of the checker for module
     * @param params {object} Required. Object with data to verify. Structure depends on type
     * @param shouldThrowError {boolean} Optional. Default: False - if True - will throw the exception
     * @param type {string} Optional. key for verification
     * @returns {boolean} True if check succeed. Otherwise - False
     */
    publicScope.checkModule = function(params, shouldThrowError, type) {
        var module = privateScope.modules[params.moduleId];
        var verificationResults;
        var exception;

        switch(type) {
            case 'moduleExists':
                verificationResults = Boolean(module);
                exception = ['errors.system.moduleNotFound', params];
                break;
            case 'instanceCreated':
                verificationResults = Boolean(module.instance);
                exception = ['errors.system.moduleInstanceNotCreated', params];
                break;
            case 'methodExists':
                verificationResults = Boolean(typeof(module.instance[params.methodName]) === 'function');
                exception = ['errors.system.moduleMethodNotFound', params];
                break;
            case 'creatorIsFunction':
                verificationResults = Boolean(typeof(params.creator) === 'function');
                exception = ['errors.system.moduleCreatorNotFunction', params];
                break;
            default:
                verificationResults = false;
                exception = ['errors.system.checkTypeNotFound', type];
                break;
        }

        if (!verificationResults) {
            helpers.Logger.error(exception[0], exception[1], shouldThrowError, 1);
        }

        return verificationResults;
    };

    return publicScope;
}());


module.exports = ApplicationCore;