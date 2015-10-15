var ApplicationCore     = (function () {
    var privateScope    = {},
        publicScope     = {},
        extensions      = {
            Sandbox     : require('./core/Sandbox'),
            Translate   : require('./translate'),
            Router      : require('./router')
        },
        helpers         = {
            Exception   : require('./core/exceptions/BaseException'),
            Logger      : require('./core/Logger'),
            Navigation  : require('./core/Navigation'),
            Lodash      : require('lodash')
        },
        _ = helpers._;
    var modules         = require('./modules/**/*', {mode: 'expand'});

    privateScope.modules = {};
    privateScope.applicationState = {
        running: false
    };

    /**
     * Start application
     * @returns {number}
     */
    privateScope.startApplicationMaker = function() {
        privateScope.applicationState.running = true;
        helpers.Logger.log('application.started', {}, 2);
        privateScope.loadPageModules();

        publicScope.startApplication = function() {
            helpers.Logger.warning('errors.system.applicationIsAlreadyStarted');

            return 0
        };

        return 0;
    };

    /**
     * Load modules that placed on current page
     */
    privateScope.loadPageModules = function() {
        var modules = extensions.Router.get(helpers.Navigation.getCurrentPage());

        if (modules instanceof Array) {
            modules.forEach(function(module) {
                publicScope.registerModule(module.id, module.creator);
            });

            helpers.Logger.log('application.modulesLoaded', {}, 7);
        } else {
            helpers.Logger.warning('application.noModulesFoundToLoad', {}, 3);
        }

        publicScope.startAllModules();
    };

    publicScope.startApplication = privateScope.startApplicationMaker;



    /**
     * Stop Application
     * Triggers stop messages to whole the application and terminates all modules
     * @returns {number}
     */
    publicScope.stopApplication = function() {
        if (!publicScope.checkIfApplicationRunning()) {
            return 0;
        }

        publicScope.stopAllModules();

        helpers.Logger.log('application.stopped', {}, 2);
        publicScope.startApplication = privateScope.startApplicationMaker;
        privateScope.applicationState.running = false;

        return 0;
    };

    /**
     * Event happens on hash change.
     * Method takes two hashes old one and new one, diffing modules betwean them,
     * and decides which modules should be created, and which should be killed
     */
    publicScope.onNavigate = function() {
        var oldPageObj = {},
            newPageObj = {},
            modulesToDestroy,
            modulesToCreate;

        oldPageObj.page = helpers.Navigation.getCurrentPage();
        oldPageObj.modules = extensions.Router.get(oldPageObj.page);

        helpers.Navigation.setUrl();
        newPageObj.page = helpers.Navigation.getCurrentPage();
        newPageObj.modules = extensions.Router.get(newPageObj.page);

        modulesToDestroy = privateScope.moduleDiff(oldPageObj.modules, newPageObj.modules);
        modulesToCreate = privateScope.moduleDiff(newPageObj.modules, oldPageObj.modules);

        modulesToDestroy.onlyLeft.forEach(function(moduleID) {
            publicScope.stopModule(moduleID);
        });

        modulesToCreate.onlyLeft.forEach(function(moduleID) {
            var module = extensions.Router.getModuleById(newPageObj.page, moduleID);

            publicScope.registerModule(module.id, module.creator);
            publicScope.startModule(module.id);
        });
        helpers.Logger.log('application.navigateFromTo', {from: oldPageObj.page, to: newPageObj.page}, 3);
    };

    /**
     * Detect differences between modules in array of modules
     * @param left {array} array of modules
     * @param right {array} array of modules
     * @returns {{matching: Array, onlyLeft: Array}} - matching - array of modules found in both left and right
     * onlyLeft - array with modules found only in left array
     */
    privateScope.moduleDiff = function(left, right) {
        var results = {
            matching    : [],
            onlyLeft    : []
        };

        left.forEach(function(lmodule) {
            var found = false;

            right.forEach(function(rmodule) {
                if (rmodule.id === lmodule.id) {
                    found = true;
                    results.matching.push(lmodule.id);
                }
            });

            if (!found) {
                results.onlyLeft.push(lmodule.id);
            }
        });

        return results;
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

        if (!publicScope.checkIfApplicationRunning()) {
            return 0;
        }

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

        if (publicScope.checkIfModuleExists(moduleId)) {
            if (publicScope.checkIfModuleInstanceCreated(moduleId)) {
                if (publicScope.checkIfModuleMethodExists(moduleId, 'destroy')) {
                    module.instance.destroy();
                }
            }
        }

        delete privateScope.modules[moduleId];
        module = undefined;
    };

    /**
     * check if application was started, and not terminated yet
     * @param shouldThrowError
     * @returns {boolean}
     */
    publicScope.checkIfApplicationRunning = function(shouldThrowError) {
        return publicScope.check({},
            shouldThrowError,
            'applicationIsRunning'
        );
    };

    /**
     * Check if module creator is function
     * @param moduleId {string}
     * @param creator {function}
     * @param shouldThrowError {boolean}
     * @returns {boolean}
     */
    publicScope.checkIfCreatorFunction = function(moduleId, creator, shouldThrowError) {
        return publicScope.check({
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
        return publicScope.check({
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
        return publicScope.check({
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
        return publicScope.check({
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
    publicScope.check = function(params, shouldThrowError, type) {
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
            case 'applicationIsRunning':
                verificationResults = Boolean(privateScope.applicationState.running);
                exception = ['errors.system.applicationNotRun', params];
                break;
            default:
                verificationResults = false;
                exception = ['errors.system.checkTypeNotFound', type];
                break;
        }

        if (!verificationResults && shouldThrowError) {
            helpers.Logger.error(exception[0], exception[1], shouldThrowError, 1);
        } else if (!verificationResults) {
            helpers.Logger.warning(exception[0], exception[1], 2);
        }

        return verificationResults;
    };

    return publicScope;
}());


module.exports = ApplicationCore;