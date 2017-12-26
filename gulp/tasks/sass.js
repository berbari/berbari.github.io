'use strict';

module.exports = function () {
  $.templates.forEach(function (name) {
    $.gulp.task('sass', function () {
      return $.gulp.src(config.srcDir + name + '/style/app.scss')
        .pipe($.gp.sassGlob())
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sass()).on('error', $.gp.notify.onError({title: 'Style'}))
        .pipe($.gp.autoprefixer({browsers: $.config.autoprefixerConfig}))
        .pipe($.gp.csso())
        .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest($.config.root + name + '/assets/css'))
        .pipe($.browserSync.stream());
    });
  })
};
