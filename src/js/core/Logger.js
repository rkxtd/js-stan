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
    function Message(message, details, logLevel) {
        this.message = message;
        this.details = details;
        this.logLevel = logLevel;
        this.date = new Date();
    }

    publicScope.log = function(msg, details, logLevel) {
        logLevel = logLevel | 3;
        var message = new Message(msg, details, logLevel);

        privateScope.messages.push(message);
        if (window.app.options.logLevel >= logLevel) {
            console.log('Logger [level:' + message.logLevel + '] ' + message.message);
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