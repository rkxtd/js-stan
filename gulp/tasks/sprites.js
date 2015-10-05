module.exports = function(gulp, gulpPlugins, config) {
    var merge = require('merge-stream');

    return gulp.task('sprites', function() {
        var imageminPngquant = require('imagemin-pngquant');

        var spriteData = gulp.src(config.sources.sprites)
            .pipe(gulpPlugins.spritesmith({
                imgName: config.names.spritesImg,
                cssName: config.names.spritesCss,
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 30,
                cssVarMap: function(sprite) {
                    sprite.name = 'sprite-' + sprite.name;
                }
            }));

        var imgStream = spriteData.img
            .pipe(imageminPngquant({
                speed: 1,
                quality: '80-90'
            })())
            .pipe(gulp.dest(config.destinations.spritesImg));

        var cssStream = spriteData.css
            .pipe(gulp.dest(config.destinations.spritesCss));

        return merge(imgStream, cssStream);
    });
};