;(function() {
    var app = this;
    app.locale = app.locale || {};

    app.locale.translations = {
        'message.welcome': 'Привіт світ!',
        'errors.system.moduleNotFound': 'Модуль [{0}] не знайдено серед зареєстрованих модулів',
        'errors.system.moduleInstanceNotCreated': 'Конструктор модуля [{0}] не було викликано',
        'errors.system.moduleMethodNotFound': 'У модуля [{1}] не знайдено метод [{1}]',
        'errors.system.moduleCreatorNotFunction': 'Для модуля [{0}] creator-функція передана з невірним типом',
        'core.sandbox.providedTypeNotString': 'Type повинен бути стрічкою',
        'core.sandbox.providedCallBackNotFunction': 'Callback повинен бути функцією',
        'core.sandbox.providedScopeNotAnObject': 'Scope повинен бути об\'єктом',
        'application.started': 'Застосування запущено',
        'application.stopped': 'Застосування зупинено',
        'sandbox.subscribedForEvent': 'Підписано на подію: [{0}]',
        'sandbox.created': 'Пісочницю створено',
        'sandbox.firedEvent': 'Трапилась подія [{0}]. Оновлюю підписників'
    }
}).call(window.app = window.app || /* istanbul ignore next */ {});