module.exports = function(gulp, gulpPlugins, config) {
    var stubby = require('gulp-stubby-server');

    return gulp.task('stubby', function() {
        var options = {
            stubs: config.stubs.port,
            files: config.stubs.files
        };

        return stubby(options, function() {});
    });
};