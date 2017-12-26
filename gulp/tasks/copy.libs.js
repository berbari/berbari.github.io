'use strict';

module.exports = function() {
    $.gulp.task('copy:libs', function() {
        return $.gulp.src(['./source/templates/**/libs/**/*.*'])
            .pipe($.gulp.dest($.config.root));
    });
};
