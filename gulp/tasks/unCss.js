'use strict';

module.exports = function () {
    $.gulp.task('unCss', function () {
        return $.gulp.src('./build/assets/css/*.css')
            .pipe($.gp.uncss({
                html: ['./build/*.html']
            }))
            .pipe($.gulp.dest($.config.root + '/assets/css'));
    })
};