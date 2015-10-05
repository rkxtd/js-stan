module.exports = function(gulp, gulpPlugins, config) {
    return gulp.task('assets', function() {
        return gulp.src(config.sources.assets)
            .pipe(gulp.dest(config.destinations.assets));
    });
};