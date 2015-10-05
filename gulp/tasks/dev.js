module.exports = function(gulp, gulpPlugins, config, runSequence) {
    return gulp.task('dev', function() {
        config.isDev = true;

        return runSequence(
            'clean',
            'browserify',
            'scripts',
            'sprites',
            'stylesheets',
            'assets',
            'sourcemap'
        );
    });
};