'use strict';

module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./source/templates/**/js/**/*.js', $.gulp.series('js:process'));
        $.gulp.watch('./source/templates/**/style/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('./source/templates/**/layout/components/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/templates/**/layout/helpers/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/templates/**/layout/instances/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/templates/**/layout/_template.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/templates/**/images/**/*.*', $.gulp.series('copy:image'));
        $.gulp.watch('./source/templates/**/fonts/**/*.*', $.gulp.series('copy:fonts'));
        $.gulp.watch('./source/templates/**/icons/*.*', $.gulp.series('svgSprite'));
        $.gulp.watch('./source/templates/**/style/lib/*.css', $.gulp.series('css:foundation'));
        $.gulp.watch('./source/templates/**/style/foundation/css.foundation.js', $.gulp.series('css:foundation'));
        $.gulp.watch('./source/templates/**/js/foundation/js.foundation.js', $.gulp.series('js:foundation'));
    });
};
