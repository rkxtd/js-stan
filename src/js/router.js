var Modules = {
    'testModule1': require('./modules/testModule/testModule'),
    'testModule2': require('./modules/testModule2/testModule'),
    'testModule3': require('./modules/testModule3/testModule')
};

var Router     = (function () {
    var routes = {
        'index': [
            {id: 'testModule1', creator: Modules['testModule1']},
            {id: 'testModule2', creator: Modules['testModule2']}
        ],
        '': [
            {id: 'testModule1', creator: Modules['testModule1']},
            {id: 'testModule3', creator: Modules['testModule3']}
        ]
        },
        scope = {};

    scope.getAll = function() {
        return routes;
    };

    scope.get = function(route) {
        return routes[route] || [];
    };

    scope.getModuleById = function(route, id) {
        var module = null;

        scope.get(route).forEach(function(moduleObj) {
            if(id === moduleObj.id) {
                module = moduleObj;
            }

            return false;
        });

        return module;
    };

    return scope;
}());

module.exports = Router;