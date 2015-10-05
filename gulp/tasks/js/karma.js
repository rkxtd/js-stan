module.exports = function(gulp, gulpPlugins, config) {
    var karma = require('karma').server;

    gulp.task('karma', function(cb) {
        return karma.start({
                configFile: config.karma,
                singleRun: true
            },
            function(exitCode) {
                if (exitCode) {
                    process.exit(exitCode);
                } else {
                    cb();
                }
            });
    });
};