'use strict';

module.exports = function () {
  $.templates.forEach(function (name) {
    $.gulp.task('svgSprite', function () {
      var config = {
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg'
          }
        }
      };
      return $.gulp.src(config.srcDir + name + '/icons/*.svg')
        .pipe($.gp.svgSprite(config))
        .pipe($.gulp.dest($.config.root + name + '/assets/icons'));
    });
  })
};
