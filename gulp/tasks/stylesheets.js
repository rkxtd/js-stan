module.exports = function(gulp, gulpPlugins, config) {
    var sass = require('gulp-sass');
    var merge = require('merge-stream');

    return gulp.task('stylesheets', function () {
        var styles = gulp.src('src/stylesheets/**/*.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(config.isDev ? gulpPlugins.plumber() : gulpPlugins.util.noop())
            .pipe(gulpPlugins.sourcemaps.init({loadMaps: true}))
            .pipe(gulpPlugins.autoprefixer({
                browsers: ['last 2 versions', 'ie > 8']
            }))
            .pipe(gulpPlugins.sourcemaps.write());

        var dependencies = gulp.src(config.sources.stylesheetsDependencies);

        return merge(dependencies, styles)
            .pipe(gulpPlugins.concat(config.names.css))
            .pipe(gulp.dest(config.destinations.stylesheets))
            .pipe(gulpPlugins.rename(config.names.cssMin))
            .pipe(gulpPlugins.minifyCss())
            .pipe(gulp.dest(config.destinations.stylesheets));

    });
};

