var Navigator = (function () {
    var privateScope = {
            url: {}
        },
        publicScope = {};

    publicScope.getCurrentUrl = function() {
        return privateScope.url.protocol
            + '//'
            + privateScope.url.hostname
            + ':'
            + privateScope.url.port
            + privateScope.url.pathname;
    };

    publicScope.getCurrentPage = function() {
        return privateScope.url.hash.split('/')[0].replace('#', '') || '';
    };

    publicScope.setUrl = function() {
        var parser = document.createElement('a');

        parser.href = window.location.href;
        privateScope.url = parser;
    };

    publicScope.navigate = function(hash) {

    };

    privateScope.init = function() {

        publicScope.setUrl();

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

module.exports = Navigator.getInstance();