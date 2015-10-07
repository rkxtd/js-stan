module.exports = (function() {
    return function (message, params) {
        console.log(message);
        this.message = message;
        this.params = params;
    }
})();