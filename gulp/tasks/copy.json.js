'use strict';

module.exports = function () {
  $.gulp.task('copy:json', function () {
    return $.gulp.src('./source/json/*.*')
    .pipe($.gulp.dest($.config.root + '/assets/json'));
  });
};
