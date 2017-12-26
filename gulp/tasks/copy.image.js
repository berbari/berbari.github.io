'use strict';

module.exports = function () {
  templates.forEach(function (name) {
    $.gulp.task('copy:image', function () {
      return $.gulp.src($.config.srcDir + name + '/images/**/*.*', {since: $.gulp.lastRun('copy:image')})
        .pipe($.gulp.dest($.config.root + name + '/assets/img'));
    });
  })
};
