module.exports = function(gulp, gulpPlugins, config, runSequence) {
    return gulp.task('release', function() {
        config.isDev = false;

        return runSequence(
            'clean',
            'code-quality',
            'browserify',
            'scripts',
            'karma',
            'sprites',
            'stylesheets',
            'assets',
            'sourcemap',
            'jsdoc'
        );
    });
};