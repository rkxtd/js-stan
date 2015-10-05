module.exports = function(gulp, gulpPlugins, config) {
    var vinylPaths = require('vinyl-paths');
    var del = require('del');

    return gulp.task('clean', function() {
        return gulp.src([config.destinations.index, './doc'])
            .pipe(vinylPaths(del))
    });
};