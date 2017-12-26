'use strict';

module.exports = function () {
  $.templates.forEach(function (name) {
    $.gulp.task('js:process', function () {
      return $.gulp.src(config.srcDir + name + '/js/*.*')
        .pipe($.gp.concat('app.js',
          {rebaseUrls: false}))
        .pipe($.gp.uglify())
        .pipe($.gulp.dest($.config.root + name + '/assets/js'))
    })
  })
};
