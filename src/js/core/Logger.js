var Logger = (function () {
    var __ = require('./utils/Translate');
    var privateScope = {
            messages: []
        },
        publicScope = {};

    /**
     * Class for creating message objects
     * @param message - string to show what happens
     * @param logLevel
     * @constructor
     */
    function Message(type, message, params, logLevel) {
        this.type = type;
        this.message = message;
        this.params = params;
        this.logLevel = logLevel;
        this.date = new Date();
    }

    Message.prototype.getFormattedMessage = function() {
        return this.format()['message'];
    };

    Message.prototype.getConsoleSettings = function() {
        return this.format()['settings'];
    };

    Message.prototype.getMessage = function() {
        return __(this.message, this.params);
    };

    Message.prototype.format = function() {
        var template = '%c [{date}\t| {type}\t|lv: {level}] {message}';
        var returnObj = {
            message: '',
            settings: ''
        };

        returnObj.message = template
            .replace('{date}', new Date().toJSON())
            .replace('T', ' ')
            .replace('Z', '')
            .replace('{type}', this.type)
            .replace('{level}', this.logLevel)
            .replace('{message}', this.getMessage())
        ;

        switch(this.type){
            case 'info':
                returnObj.settings = 'color: gray';
                break;
            case 'warning':
                returnObj.settings = 'color: orange';
                break;
            case 'error':
                returnObj.settings = 'color: red';
                break;
        }


        return returnObj;
    };

    /**
     * Logger function
     * @param msg
     * @param params
     * @param logLevel
     */
    publicScope.log = function(msg, params, logLevel) {
        privateScope.addMessage('info', msg, params, false, logLevel);
    };

    publicScope.warning = function(msg, params, logLevel) {
        privateScope.addMessage('warning', msg, params, false, logLevel);
    };

    publicScope.error = function(msg, params, shouldThrowTheError, logLevel) {
        privateScope.addMessage('error', msg, params, shouldThrowTheError, logLevel);
    };

    privateScope.addMessage = function(type, msg, params, shouldThrowTheError, logLevel) {
        logLevel = logLevel || 3;
        shouldThrowTheError = shouldThrowTheError || false;

        var message = new Message(type, msg, params, logLevel);

        privateScope.messages.push(message);
        privateScope.display(message);

        if (shouldThrowTheError) {
            // TODO: implement throwing exception
            // throw new Exception('error');
        }
    };

    privateScope.display = function(message) {
        if (app.options.logging.enabled) {
            if (app.options.logging.displayLogLevels[message.type] >= message.logLevel) {
                console.log(message.getFormattedMessage(), message.getConsoleSettings());
            }
        }
    };

    privateScope.init = function() {
        return publicScope;
    };

    return {
        getInstance: function () {
            if ( !privateScope.instance ) {
                privateScope.instance = privateScope.init();
            }

            return privateScope.instance;
        }

    };

})();

module.exports = Logger.getInstance();