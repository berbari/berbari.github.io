'use strict';

module.exports = function() {
    $.gulp.task('copy:libs', function() {
        return $.gulp.src(['./source/libs/**/*.*'], { since: $.gulp.lastRun('copy:libs') })
            .pipe($.gulp.dest($.config.root + '/assets/libs'));
    });
};
