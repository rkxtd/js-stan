module.exports = (function() {
    return function (message, params) {
        console.log('Exception: ' + message);
        console.log(params);
        this.message = message;
        this.params = params;
    }
})();