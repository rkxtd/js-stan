var ApplicationCore = (function () {
    var privateScope = {};
    var publicScope = {};
    var mixins = {};

    var _ = require('lodash');
    var Sandbox = require('./core/Sandbox');
    var Exception = require('./core/exceptions/BaseException');

    privateScope.modules = {};

    /**
     * Start application
     * @returns {number}
     */
    publicScope.startApplication = function() {
        console.log('Application started');
        var testModule = require('./modules/testModule/testModule');

        publicScope.registerModule('testModule', testModule);
        publicScope.startAllModules();
        publicScope.stopApplication();

        return 0;
    };

    /**
     * Stop Application
     * @returns {number}
     */
    publicScope.stopApplication = function() {
        publicScope.stopAllModules();

        console.log('Application stopped');

        return 0;
    };

    /**
     * Add new module to the system, and make some basic checks
     * @param moduleId
     * @param creator
     */
    publicScope.registerModule = function(moduleId, creator) {
        publicScope.checkIfCreatorFunction(moduleId, creator, true);

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
        var $ = require('jquery');


        publicScope.checkIfModuleExists(moduleId, true);
        module.instance = module.creator(new Sandbox(this), $);
        publicScope.checkIfModuleInstanceCreated(moduleId, true);
        publicScope.checkIfModuleMethodExists(moduleId, 'init', true);

        module.instance.init();
    };

    /**
     * run all the modules
     */
    publicScope.startAllModules = function() {
        _.forEach(privateScope.modules, function(module, moduleId) {
            if (privateScope.modules.hasOwnProperty(moduleId)) {
                publicScope.startModule(moduleId);
            }
        });
    };

    /**
     * Stop all the modules
     */
    publicScope.stopAllModules = function() {
        _.forEach(privateScope.modules, function(module, moduleId) {
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
        if (typeof(creator) !== 'function') {
            if (shouldThrowError) {
                throw new Exception('errors.system.moduleCreatorNotFunction', moduleId);
            }
            return false;
        }

        return true;
    };

    /**
     * @Decorator
     * Check whenewer module was added to modules or not
     * @param moduleId {string}
     * @param shouldThrowError {boolean}
     * @return {boolean | Exception}
     */
    publicScope.checkIfModuleExists = function(moduleId, shouldThrowError) {
        return privateScope.checkModule({
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
        return privateScope.checkModule({
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
        return privateScope.checkModule({
                moduleId: moduleId,
                method: method
            },
            shouldThrowError,
            'methodExists'
        );
    };

    publicScope.render = function() {
        var jade = require('jade');
        var fn = jade.compileFile('../templates/layout.jade');
        var html = fn();

        return html;
    };
    /**
     * Actual implementation of the checker for module
     * @param params
     * @param shouldThrowError
     * @param type
     * @returns {*}
     */
    privateScope.checkModule = function(params, shouldThrowError, type) {
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
                verificationResults = Boolean(typeof(module.instance[params.method]) === 'function');
                exception = ['errors.system.moduleMethodNotFound', params];
                break;
            default:
                break;
        }

        if (!verificationResults && shouldThrowError) {
            throw new Exception(exception[0], exception[1]);
        }

        return verificationResults;

    };

    return publicScope;
}());


module.exports = ApplicationCore;