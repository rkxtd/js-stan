var cover = require('browserify-istanbul');

var karmaConf = {};

karmaConf.sources = {
    js: [
        'src/**/*.js'
    ],
    fixtures: [
        'tests/fixtures/**/*.html',
        'tests/fixtures/**/*.json'
    ],
    tests: [
        'tests/specs/**/*.js'
    ]
};

var coverConfig = {
    ignore: ['**/node_modules/**', '**/*.spec.js', '**/*.json', '**/lib/*.js'],
    defaultIgnore: true
};

var browserifyConfig = {
    debug: true,
    paths: ['src', 'tests'],
    plugin: ['proxyquireify/plugin'],
    configure: function(bundle) {
        bundle.on('prebundle', function() {
            return bundle
                .transform(cover(coverConfig));
        });
    }
};

module.exports = function(config) {
    config.set({
        basePath: './',
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        browserDisconnectTimeout: 60000,
        browserDisconnectTolerance: 5,
        browserNoActivityTimeout: 60000,
        frameworks: ['mocha', 'sinon-chai', 'browserify', 'fixture'],
        reporters: ['mocha', 'coverage'],
        colors: true,
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'tests/specs/**/*.js': ['browserify'],
            'tests/fixtures/**/*.html': ['html2js'],
            'tests/fixtures/**/*.json': ['json_fixtures']
        },
        coverageReporter: {
            dir: 'karma/coverage/',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'}
            ]
        },
        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },
        browserify: browserifyConfig,
        files: [].concat(karmaConf.sources.js, karmaConf.sources.tests, karmaConf.sources.fixtures)
    });
};