module.exports = function(gulp, gulpPlugins, config) {
    return gulp.task('webserver', function() {
        var webserver = gulpPlugins.webserver;
        var connect = require('connect');
        var url = require('url');
        var proxy = require('proxy-middleware');
        var merge = require('merge-stream');
        var app = connect();

        switch (config.webServer) {
            case 'stubby':
            default :
                app.use(config.apiUrl, proxy(url.parse(config.stubbyApi)));
                break;
        }

        return gulp.src('./dist')
            .pipe(webserver({
                livereload: {
                    port: 8811,
                    enable: true
                },
                port: 8810,
                host: '0.0.0.0',
                middleware: [app],
                open: true
            }));
    });
};