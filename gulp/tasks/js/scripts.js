module.exports = function(gulp, gulpPlugins, config) {
    return gulp.task('scripts', function() {
        var merge = require('merge-stream');

        var translations = gulp.src(config.sources.translation)
            .pipe(gulpPlugins.uglify(config.uglifyOptions))
            .pipe(gulp.dest(config.destinations.translations));

        var appDependencies = gulp.src(config.sources.scriptsDependencies)
            .pipe(gulp.dest(config.destinations.dependencies));

        if (config.isDev) {
            return merge(
                appDependencies,
                translations
            );
        } else {

            var createAppScript = merge(
                appDependencies
            )
                .pipe(gulpPlugins.concat(config.names.scripts))
                .pipe(gulpPlugins.rename(config.names.appMin))
                .pipe(gulpPlugins.uglify(config.uglifyOptions))
                .pipe(gulp.dest(config.destinations.scripts));

            return merge(
                createAppScript,
                translations
            )
        }
    });
};