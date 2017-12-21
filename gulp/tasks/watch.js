'use strict';

module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./source/js/**/*.js', $.gulp.series('js:process'));
        $.gulp.watch('./source/style/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('./source/php/*.php', $.gulp.series('copy:php'));
        $.gulp.watch('./source/template/components/*.pug', $.gulp.series('concat:pug', 'pug'));
        $.gulp.watch('./source/template/helpers/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/template/pages/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/template/_template.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/template/_template-promo.pug', $.gulp.series('pug'));
        $.gulp.watch('./source/images/**/*.*', $.gulp.series('copy:image'));
        $.gulp.watch('./source/fonts/**/*.*', $.gulp.series('copy:fonts'));
        $.gulp.watch('./source/icons/*.*', $.gulp.series('svgSprite'));
        $.gulp.watch('./source/style/lib/*.css', $.gulp.series('css:foundation'));
        $.gulp.watch('./gulp/paths/css.foundation.js', $.gulp.series('css:foundation'));
        $.gulp.watch('./gulp/paths/js.foundation.js', $.gulp.series('js:foundation'));
    });
};
