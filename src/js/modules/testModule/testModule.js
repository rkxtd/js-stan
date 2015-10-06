module.exports = (function() {
    var sandbox,
        _;
    var publicScope = {};
    var privateScope = {};

    publicScope.init = function() {
        sandbox.sayHi();
        console.log('Hi this is module');
        sandbox.listen('module.update', _.bind(this, privateScope.moduleUpdate));
    };

    publicScope.destroy = function() {
        console.log('Module sath: Goodbye');
    };

    privateScope.moduleUpdate = function(data) {
        debugger;
        console.log('This is testModule.moduleUpdate event.' + data);
    };

    return function(localSandbox, lodash) {
        sandbox = localSandbox;
        _ = lodash;

        return publicScope;
    };
}());