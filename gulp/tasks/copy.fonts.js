'use strict';

module.exports = function () {
  templates.forEach(function (name) {
    $.gulp.task('copy:fonts', function () {
      return $.gulp.src($.config.srcDir + name + '/fonts/**/*.*')
        .pipe($.gulp.dest($.config.root + name + '/assets/fonts'));
    });
  })
};
