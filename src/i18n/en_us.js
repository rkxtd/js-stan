;(function() {
    var app = this;
    app.locale = app.locale || {};

    app.locale.translations = {
        'message.welcome': 'Hello World',
        'errors.system.moduleNotFound': 'Module {0} not found in registered modules',
        'errors.system.moduleInstanceNotCreated': 'For module {0} instnce was not created',
        'errors.system.moduleMethodNotFound': 'Can\'t find method {0} in module {1}',
        'errors.system.moduleCreatorNotFunction': 'For module {0} creator Function passed not as Function',
        'core.sandbox.providedTypeNotString': 'Type should be string',
        'core.sandbox.providedCallBackNotFunction': 'Callback should be a function',
        'core.sandbox.providedScopeNotAnObject': 'Scope should be an object',
        'application.started': 'Application started',
        'application.stopped': 'Application stopped',
        'sandbox.subscribedForEvent': 'Subscribed for event: [{0}]',
        'sandbox.created': 'Sandbox created',
        'sandbox.firedEvent': 'Received event [{0}]. Notifying listeners'
    }
}).call(window.app = window.app || /* istanbul ignore next */ {});