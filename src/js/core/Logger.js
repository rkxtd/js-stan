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

    /**
     * Logger function
     * @param msg
     * @param details
     * @param logLevel
     */
    publicScope.log = function(msg, details, logLevel) {
        logLevel = logLevel || 3;
        var message = new Message(msg, details, logLevel);

        privateScope.messages.push(message);
        if (window.app.options.logLevel >= logLevel) {
            console.log('[' + new Date().toJSON().replace('T', ' ').replace('Z', '') + '|lv:' + message.logLevel + '] ' + message.message);
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