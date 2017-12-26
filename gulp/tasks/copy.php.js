'use strict';

module.exports = function () {
  $.gulp.task('copy:php', function () {
    return $.gulp.src('./source/templates/**/php/*.*')
    .pipe($.gulp.dest($.config.root));
  });
};
