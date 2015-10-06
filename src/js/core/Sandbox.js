var Sandbox = (function() {
    var privateScope = {};
    var publicScope = {};

    var func = function () {
        console.log('Sandbox created');
    };
    func.prototype = publicScope;

    publicScope.sayHi = function() {
        console.log('Hi this is Sandbox');
    };

    return func;
}());

module.exports = Sandbox;