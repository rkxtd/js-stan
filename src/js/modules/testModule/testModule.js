module.exports = (function() {
    var scope = {
        public: {},
        private: {}
    };
    var me;
    var logger;

    scope.public.init = function() {
        logger.log('Hi this is module');
        me.sandbox.listen('module.update', me.moduleUpdate, scope);
    };

    scope.public.destroy = function() {
        logger.log('Module sath: Goodbye');
    };

    scope.private.moduleUpdate = function(data) {
        logger.log('This is testModule.moduleUpdate event.' + data);
    };

    return function(sandbox) {
        scope.private.sandbox   = sandbox;
        me                      = scope.private;
        logger                  = sandbox.helpers.logger;

        return scope.public;
    };
}());