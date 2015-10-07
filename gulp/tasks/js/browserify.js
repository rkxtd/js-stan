module.exports = function(gulp, gulpPlugins, config) {
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var gutil = require('gulp-util');
    var reactify = require('reactify');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    var globify = require('require-globify');

    return gulp.task('browserify', function () {
        // set up the browserify instance on a task basis
        var b = browserify({
            entries: './src/js/app.js',
            debug: true,
            // defining transforms here will avoid crashing your stream
            transform: [globify, reactify]
        });

        return b.bundle()
            .pipe(source(config.names.scripts))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .on('error', gutil.log)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/scripts/'));
    });
};