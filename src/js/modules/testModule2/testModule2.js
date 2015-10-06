module.exports = (function() {
    var sandbox;
    var publicScope = {};
    var privateScope = {};

    publicScope.init = function() {
        sandbox.sayHi();
        console.log('Hi this is module 2');
        sandbox.notify('module.update', 'This is message from testModule2');
    };

    publicScope.destroy = function() {
        console.log('Module 2 sath: Goodbye');
    };

    return function(localSandbox) {
        sandbox = localSandbox;

        return publicScope;
    };
}());