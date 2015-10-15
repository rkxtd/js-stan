var Sandbox = (function() {
    var scope   = {
        helpers : {},
        public  : {}
    };

    /**
     * Constructor of the module
     * @param helpers
     * @constructor
     */
    var Sandbox = function (helpers) {
        scope.helpers = helpers;
        helpers.Logger.log('sandbox.created', {}, 5);
    };
    scope.types     = [];
    Sandbox.prototype   = scope.public;

    /**
     * Subscribe for specified event, with binding callBack and passing scope
     * @param eventName {string} Required - event which module want to listen, and fire callBack
     * @param callBack {function} Required - function which will be executed, eventData will be passed as first param
     * @param passedScope {object} Optional. Default: {} - Scope which will be applied to function.
     */
    scope.public.listen = function(eventName, callBack, passedScope) {
        if (typeof(eventName) !== 'string') {
            throw new scope.helpers.Exception('core.sandbox.providedTypeNotString');
        }

        if (typeof(callBack) !== 'function') {
            throw new scope.helpers.Exception('core.sandbox.providedCallBackNotFunction');
        }

        if (passedScope && typeof(passedScope) !== 'object') {
            throw new scope.helpers.Exception('core.sandbox.providedScopeNotAnObject');
        }

        var listener = {
            fn: callBack,
            scope: passedScope || /* istanbul ignore next */ {}
        };

        if (Object.prototype.toString.call() === '[object Array]') {
            scope.types[eventName].push(listener);
        } else {
            scope.types[eventName] = [listener];
        }

        scope.helpers.Logger.log('sandbox.subscribedForEvent', {eventName: eventName});
    };

    /**
     * Fires event within specified namespace.
     * @param eventName {string} - Required. event name
     * @param data {mixed} - Optional. data should be passed to all the subscribers
     */
    scope.public.notify = function(eventName, data) {
        scope.helpers.Logger.log('sandbox.firedEvent', {eventName: eventName}, 2);
        /* istanbul ignore next */
        if (!scope.types.hasOwnProperty(eventName)) {
            return 0;
        }

        scope.types[eventName].forEach(function(listener) {
            listener.fn.apply(listener.scope, [data]);
        })
    };

    return Sandbox;
}());

module.exports = Sandbox;