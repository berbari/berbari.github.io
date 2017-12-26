'use strict';

module.exports = function () {
  $.templates.forEach(function (name) {
    $.gulp.task('js:foundation', function () {
      return $.gulp.src(config.srcDir + name + '/js/foundation/*.*')
        .pipe($.gp.concat('foundation.js',
          {rebaseUrls: false}))
        .pipe($.gp.uglify())
        .pipe($.gulp.dest($.config.root + name + '/assets/js'))
    })
  })
};
