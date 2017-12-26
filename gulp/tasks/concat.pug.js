'use strict';

module.exports = function() {
    $.gulp.task('concat:pug', function() {
return $.gulp.src('./source/templates/**/components/*.pug')
    .pipe($.gulp.dest('./source/templates/globComponents'))

    });
};
