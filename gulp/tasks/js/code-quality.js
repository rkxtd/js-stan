module.exports = function(gulp, gulpPlugins, config) {
    var jscs = gulpPlugins.jscs;
    var jshint = gulpPlugins.jshint;

    return gulp.task('code-quality', function() {
        return gulp.src(config.sources.scripts)
            .pipe(jshint(config.jshintrc))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
            .pipe(jscs(config.jscs))
            .pipe(jshint.reporter('fail'));
    });
};