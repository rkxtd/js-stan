;(function() {
    var app = this;
    app.locale = app.locale || {};

    app.locale.translations = {
        'message.welcome': 'Hello World',
        'errors.system.moduleNotFound': 'Module {moduleId} not found in registered modules',
        'errors.system.moduleInstanceNotCreated': 'For module {moduleId} instnce was not created',
        'errors.system.moduleMethodNotFound': 'Can\'t find method {methodName} in module {moduleId}',
        'errors.system.moduleCreatorNotFunction': 'For module {moduleId} creator Function passed not as Function',
        'errors.system.checkTypeNotFound': 'System check [{0}] not registered',
        'core.sandbox.providedTypeNotString': 'Type should be string',
        'core.sandbox.providedCallBackNotFunction': 'Callback should be a function',
        'core.sandbox.providedScopeNotAnObject': 'Scope should be an object',
        'application.started': 'Application started',
        'application.stopped': 'Application stopped',
        'sandbox.subscribedForEvent': 'Subscribed for event: [{eventName}]',
        'sandbox.created': 'Sandbox created',
        'sandbox.firedEvent': 'Received event [{eventName}]. Notifying listeners'
    }
}).call(window.app = window.app || /* istanbul ignore next */ {});