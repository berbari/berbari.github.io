'use strict';

module.exports = function() {
  $.templates.forEach(function (name) {
    $.gulp.task('pug', function() {
      return $.gulp.src(config.srcDir+name+'/layout/instances/*.pug')
        .pipe($.gp.pug)
        .on('error', $.gp.notify.onError(function(error) {
          return {
            title: 'Pug',
            message:  error.message
          }
        }))
        .pipe($.gulp.dest($.config.root+name));
    });
  })
};
