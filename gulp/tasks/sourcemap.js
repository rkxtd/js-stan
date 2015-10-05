module.exports = function(gulp, config) {
    return gulp.task('sourcemap', function() {
        var fs = require('fs');

        var sourceMap = {
            scripts: [],
            stylesheets: [],
            html: '',
            translationsPath: ''
        };

        var generatePath = function(filename, type) {
            var path = '';

            switch (type) {
                case 'stylesheets':
                    path = config.destinations.stylesheets + '/' + filename;
                    break;

                case 'scripts':
                    path = config.destinations.scripts + '/' + filename;
                    break;

                case 'translations':
                    path = config.destinations.translations;
                    break;
            }

            path = config.backend.cdnBasePath + config.backend.cdnSuffix + path;

            path = path.replace(config.destinations.index + '/', '');

            return path;
        };

        sourceMap.stylesheets.push(generatePath(config.names.cssMin, 'stylesheets'));
        sourceMap.scripts.push(generatePath(config.names.rebootMin, 'scripts'));
        sourceMap.html = '<div class="app js-app" data-options=\'' + config.backend.options + '\' data-base-path="' + config.backend.cdnBasePath + config.backend.cdnSuffix.replace('/', '') + '"></div>';
        sourceMap.translationsPath = generatePath(null, 'translations');

        fs.writeFileSync(config.destinations.index + '/' + config.names.mapTemplate, JSON.stringify(sourceMap));
    });
};