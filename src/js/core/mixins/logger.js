var Logger = (function () {

    var privateScope = {
            messages: []
        },
        publicScope = {};

    function Message(message) {
        this.message = message;
        this.date = new Date();
    }

    publicScope.log = function(msg) {
        privateScope.messages.push(new Message(msg));
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

module.exports = Logger().getInstance();