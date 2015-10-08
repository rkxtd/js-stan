module.exports = (function() {
    var sandbox,
        helpers;
    var publicScope = {};

    publicScope.init = function() {
        helpers.Logger.log('Hi this is module 2');
        sandbox.notify('module.update', 'This is message from testModule2');
    };

    publicScope.destroy = function() {
        helpers.Logger.log('Module 2 sath: Goodbye');
    };

    return function(localSandbox, localHelpers) {
        sandbox = localSandbox;
        helpers = localHelpers;
        return publicScope;
    };
}());