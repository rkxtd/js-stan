module.exports = {
    sources: {
        src: 'src',
        scripts: [
            'src/js/app.js'
        ],
        watchScripts: [
            'src/js/**/*.js'
        ],
        scriptsDependencies: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/lodash/lodash.min.js'
        ],
        translation: 'src/i18n/**/*.js',
        stylesheets: 'src/stylesheets/**/*.scss',
        stylesheetsDependencies: [],
        assets: 'src/assets/**/*',
        sprites: 'src/sprites/**/*.png'
    },
    destinations: {
        index: 'dist',
        scripts: 'dist/scripts',
        templates: 'dist/scripts',
        translations: 'dist/scripts/translations',
        stylesheets: 'dist/style',
        assets: 'dist',
        spritesImg: 'src/assets/images',
        spritesCss: 'src/stylesheets/core',
        dependencies: 'dist/libs'
    },
    names: {
        scripts: 'app.js',
        appMin: 'app.min.js',
        spritesCss: '_sprites.scss',
        spritesImg: '../images/sprites.png',
        css: 'app.css',
        cssMin: 'app.min.css',
        applicationTemplate: 'application.html',
        mapTemplate: 'map.json_template'
    },
    stubs: {
        port: 8882,
        files: ['stubs/v1/*.{json,yaml,js}']
    },
    backend: {
        cdnBasePath: '@cdnDistribution.basePath@',
        cdnSuffix: 'shelf/',
        options: '@options@'
    },
    uglifyOptions: {
        compress: {
            sequences: true,  // join consecutive statemets with the “comma operator”
            drop_debugger: true,  // discard “debugger” statements
            conditionals: true,  // optimize if-s and conditional expressions
            comparisons: true,  // optimize comparisons
            evaluate: true,  // evaluate constant expressions
            booleans: true,  // optimize boolean expressions
            loops: true,  // optimize loops
            unused: true,  // drop unused variables/functions
            hoist_funs: true,  // hoist function declarations
            if_return: true,  // optimize if-s followed by return/continue
            join_vars: true,  // join var declarations
            warnings: false,  // warn about potentially dangerous optimizations/code
            dead_code: true,
            global_defs: {
                DEBUG: false
            }
        }
    },
    apiUrl: '/api/v1.0/',
    stubbyApi: 'http://localhost:8882/api/v1.0/',
    jscs: __dirname + '/../../.jscsrc',
    jshintrc: __dirname + '/../../.jshintrc',
    karma: __dirname + '/../../karma.conf.js',
    packageJson: __dirname + '/../../package.json',
    isDev: true,
    webServer: 'stubby',
    mainBowerFiles:{
        app: {
            filter: function(path) {
                return /.*\.js$/i.exec(path) && !/underscore/i.exec(path)
            },
            overrides: {
                'jquery': {
                    main: 'dist/jquery.min.js'
                },
                'lodash': {
                    main: 'lodash.min.js'
                }
            }
        }
    },
    banner: [
        '/**',
        ' * <%= pkg.name %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' */',
        ''
    ].join('\n')
};
