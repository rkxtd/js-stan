module.exports = (function() {
    var sandbox;
    var publicScope = {};
    var privateScope = {};

    publicScope.init = function() {
        sandbox.sayHi();
        console.log('Hi this is module');
    };

    publicScope.destroy = function() {
        console.log('Module sath: Goodbye');
    };

    return function(localSandbox) {
        sandbox = localSandbox;

        return publicScope;
    };
}());