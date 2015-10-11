module.exports = (function() {
    var sandbox,
        helpers;
    var publicScope = {};

    publicScope.init2 = function() {
        helpers.Logger.log('Hi this is module 4');
    };

    publicScope.destroy = function() {
        helpers.Logger.log('Module 4 sath: Goodbye');
    };

    return function(localSandbox, localHelpers) {
        sandbox = localSandbox;
        helpers = localHelpers;

        return publicScope;
    };
}());