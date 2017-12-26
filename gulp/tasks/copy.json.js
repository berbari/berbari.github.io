'use strict';

module.exports = function () {
  $.gulp.task('copy:json', function () {
    return $.gulp.src('./source/templates/**/json/*.*')
    .pipe($.gulp.dest($.config.root));
  });
};
