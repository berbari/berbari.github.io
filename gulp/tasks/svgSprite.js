'use strict';

module.exports = function () {
    $.gulp.task('svgSprite', function () {
        var config = {
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'sprite.svg'
                }
            }
        };
        return $.gulp.src('./source/icons/*.svg')
            .pipe($.gp.svgSprite(config))
            .pipe($.gulp.dest($.config.root + '/assets/icons'))
    });
};
