module.exports = function(gulp, gulpPlugins, config, runSequence) {
    return gulp.task('app-stubby', function() {
        config.webServer = 'stubby';

        return runSequence(
            'clean',
            'dev',
            'stubby',
            'webserver',
            'watch'
        );
    });
};