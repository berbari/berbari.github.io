'use strict';

module.exports = function () {
  $.templates.forEach(function (name) {
    $.gulp.task('css:foundation', function () {
      return $.gulp.src(config.srcDir + name + '/style/foundation/*.*')
        .pipe($.gp.concatCss('foundation.css',
          {rebaseUrls: false}))
        .pipe($.gp.csso())
        .pipe($.gulp.dest($.config.root + name + '/assets/css'))
    });
  })
};
