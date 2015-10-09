var Logger = (function () {

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
    function Message(type, message, details, logLevel) {
        this.type = type;
        this.message = message;
        this.details = details;
        this.logLevel = logLevel;
        this.date = new Date();
    }

    Message.prototype.getFormattedMessage = function() {
        return this.format()['message'];
    };

    Message.prototype.getConsoleSettings = function() {
        return this.format()['settings'];
    };

    Message.prototype.format = function() {
        var template = '%c [{date} | {type} | lv: {level}] {message} [{details}]';
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
            .replace('{message}', this.message)
            .replace('{details}', (this.details) ? 'Look inside the log' : '')
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
     * @param details
     * @param logLevel
     */
    publicScope.log = function(msg, details, logLevel) {
        privateScope.addMessage('info', msg, details, false, logLevel);
    };

    publicScope.warning = function(msg, details, logLevel) {
        privateScope.addMessage('warning', msg, details, false, logLevel);
    };

    publicScope.error = function(msg, details, shouldThrowTheError, logLevel) {
        privateScope.addMessage('error', msg, details, shouldThrowTheError, logLevel);
    };

    privateScope.addMessage = function(type, msg, details, shouldThrowTheError, logLevel) {
        logLevel = logLevel || 3;
        shouldThrowTheError = shouldThrowTheError || false;
        var message = new Message(type, msg, details, logLevel);

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
                //} console.log('%c Oh my heavens! ', 'color: red');
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