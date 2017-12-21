'use strict';

module.exports = function () {
    $.gulp.task('js:process', function () {
        return $.gulp.src($.path.app)
            .pipe($.gp.concat('app.js'))
            .pipe($.gp.uglify())
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    })
};
