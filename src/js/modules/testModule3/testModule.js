module.exports = (function() {
    var sandbox,
        helpers;

    var publicScope = {};
    var privateScope = {
        id: 'TestModule3'
    };

    publicScope.init = function() {
        helpers.Logger.log('Hi this is module 3');
    };

    publicScope.getID = function() {
        return privateScope.id;
    };

    publicScope.destroy = function() {
        helpers.Logger.log('Module 3 sath: Goodbye');
    };

    return function(localSandbox, localHelpers) {
        sandbox = localSandbox;
        helpers = localHelpers;

        return publicScope;
    };
}());