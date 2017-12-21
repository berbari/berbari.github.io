'use strict';

module.exports = function() {
    $.gulp.task('concat:pug', function() {
return $.gulp.src('./source/template/components/*.pug')
    .pipe($.gp.concat('components.pug'))
    .pipe($.gulp.dest('./source/template/'))

    });
};
