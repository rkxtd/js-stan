var format = function (str, col) {
    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        /* istanbul ignore next */ if (m == "{{") { return "{"; }
        /* istanbul ignore next */ if (m == "}}") { return "}"; }
        return col[n];
    });
};

module.exports = function(key, params) {
    var translation = window.app.locale.get(key);

    /* istanbul ignore else */
    if (!params || params.constructor !== Array) {
        params = params ? [params] : [];
    }

    params.unshift(translation);

    return format.apply({}, params);
};