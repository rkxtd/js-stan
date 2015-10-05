module.exports = function(gulp, gulpPlugins, config) {
    var q = require('q');
    var runSequence = require('run-sequence');

    require('./clean')(gulp, gulpPlugins, config);

    require('./js/code-quality')(gulp, gulpPlugins, config);
    require('./js/browserify')(gulp, gulpPlugins, config);
    require('./js/scripts')(gulp, gulpPlugins, config);
    require('./js/jsdoc')(gulp, gulpPlugins, config);

    require('./stylesheets')(gulp, gulpPlugins, config);
    require('./sprites')(gulp, gulpPlugins, config);
    require('./assets')(gulp, gulpPlugins, config);

    require('./sourcemap')(gulp, config);

    // Build app
    require('./dev')(gulp, gulpPlugins, config, runSequence);
    require('./release')(gulp, gulpPlugins, config, runSequence);

    // Tests
    require('./js/karma')(gulp, gulpPlugins, config);

    // Metry App
    require('./app/watch')(gulp, gulpPlugins, config, runSequence);
    require('./app/webserver')(gulp, gulpPlugins, config, runSequence);
    require('./app/stubby')(gulp, gulpPlugins, config, runSequence);
    require('./app/app-stubby')(gulp, gulpPlugins, config, runSequence);
};