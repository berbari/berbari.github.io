'use strict';

module.exports = function() {
  $.gulp.task('css:foundation', function() {
    return $.gulp.src($.path.cssFoundation)
      .pipe($.gp.concatCss('foundation.css',
          {rebaseUrls: false}))
      .pipe($.gp.csso())
      .pipe($.gulp.dest($.config.root + '/assets/css'))
  })
};
