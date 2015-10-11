module.exports = (function() {
    var sandbox,
        helpers;

    var publicScope = {};

    publicScope.init = function() {
        helpers.Logger.log('Hi this is module 3');
    };

    publicScope.destroy = function() {
        helpers.Logger.log('Module 3 sath: Goodbye');
    };

    return function(localSandbox, localHelpers) {
        sandbox = localSandbox;
        helpers = localHelpers;

        return null;
    };
}());