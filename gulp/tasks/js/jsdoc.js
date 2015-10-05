module.exports = function(gulp, gulpPlugins, config) {
    var shell = gulpPlugins.shell;

    return gulp.task('jsdoc', function() {
        shell([
            'node ./node_modules/jsdoc/jsdoc ./src/js/*.js ./src/js/modules/**/*.js ./src/js/plugins/*.js ./src/js/utils/*.js -d ./docs -a all'
        ], {
            ignoreErrors: true
        })
    });
};