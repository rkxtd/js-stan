module.exports = function(gulp, gulpPlugins, config) {
    return gulp.task('watch', function() {
        gulp.watch(config.sources.stylesheets, ['stylesheets']);
        gulp.watch(config.sources.watchScripts, ['browserify']);
        gulp.watch(config.sources.translation, ['scripts']);
    });
};