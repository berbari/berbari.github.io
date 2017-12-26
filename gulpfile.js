'use strict';

let gulp = require('gulp'),
  config = require('./gulp/config'),
  path = require('path'),
  glob = require('glob'),
  merge = require('merge-stream'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  gp = require('gulp-load-plugins')({
    rename: {
      'gulp-svg-sprite': 'svgSprite',
      'gulp-sass-glob': 'sassGlob',
      'gulp-sourcemaps': 'sourcemaps'
    }
  }),
  argv = require('yargs').argv,
  gulpif = require('gulp-if'),
  templates = glob.sync('./source/templates/*').map(function (componentDir) {
    return path.basename(componentDir);
  });

templates.forEach(function (name) {

  // gulp.task(name + '-css:foundation', function () {
  //   return gulp.src(config.srcDir + name + '/style/foundation/*.*')
  //     .pipe(gp.concatCss('foundation.css', {rebaseUrls: false}))
  //     .pipe(gp.csso())
  //     .pipe(gulp.dest(config.root + name + '/assets/css'))
  // });

  // gulp.task(name + '-js:foundation', function () {
  //   return gulp.src(config.srcDir + name + '/js/foundation/*.*')
  //     .pipe(gp.concat('foundation.js',
  //       {rebaseUrls: false}))
  //     .pipe(gp.uglify())
  //     .pipe(gulp.dest(config.root + name + '/assets/js'))
  // });

  gulp.task(name + '-copy:fonts', function () {
    return gulp.src(config.srcDir + name + '/fonts/**/*.*')
      .pipe(gulp.dest(config.root + name + '/assets/fonts'));
  });

  gulp.task(name + '-copy:image', function () {
    return gulp.src(config.srcDir + name + '/images/**/*.*')
      .pipe(gulp.dest(config.root + name + '/assets/img'));
  });

  gulp.task(name + '-js:process', function () {
    return gulp.src(config.srcDir + name + '/js/*.*')
      .pipe(gp.concat('app.js',
        {rebaseUrls: false}))
      .pipe(gp.uglify())
      .pipe(gulp.dest(config.root + name + '/assets/js'))
  });

  gulp.task(name + '-pug', function () {
    return gulp.src(config.srcDir + name + '/layout/instances/*.pug')
      .pipe(gp.pug(config.pugConfig))
      .on('error', gp.notify.onError(function (error) {
        return {
          title: 'Pug',
          message: error.message
        }
      }))
      .pipe(gulp.dest(config.root + name));
  });

  gulp.task(name + '-sass', function () {
    return gulp.src(config.srcDir + name + '/style/app.scss')
      .pipe(gp.sassGlob())
      .pipe(gp.sourcemaps.init())
      .pipe(gp.sass()).on('error', gp.notify.onError({title: 'Style'}))
      .pipe(gp.autoprefixer({browsers: config.autoprefixerConfig}))
      .pipe(gp.csso())
      .pipe(gp.sourcemaps.write())
      .pipe(gulp.dest(config.root + name + '/assets/css'))
      .pipe(browserSync.stream());
  });

  gulp.task(name + '-svgSprite', function () {
    return gulp.src(config.srcDir + name + '/icons/*.svg')
      .pipe(gp.svgSprite({
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg'
          }
        }
      }))
      .pipe(gulp.dest(config.root + name + '/assets/icons'));
  });

  gulp.task(name + '-build', gulp.parallel(name + '-copy:fonts', name + '-copy:image', name + '-js:process', name + '-pug', name + '-sass', name + '-svgSprite'));
});

gulp.task('clean', function (cb) {
  return rimraf(config.root, cb);
});

gulp.task('serve', function () {

  browserSync(
    {
      notify: false,
      port: 3000,
      server: {
        baseDir: config.root,
        directory: true
      },
    }
  );
  /*.init({
   open: false,
   server: config.root
   })*/
  ;

  browserSync.watch([config.root + '/**/*.*', '!**/*.css'], browserSync.reload);
});


gulp.task('watch', function () {
  gulp.watch('./source/templates/' + argv.template + '/js/*.js', gulp.series(argv.template + '-js:process'));
  gulp.watch('./source/templates/' + argv.template + '/style/**/*.scss', gulp.series(argv.template + '-sass'));
  gulp.watch('./source/templates/' + argv.template + '/layout/components/*.pug', gulp.series(argv.template + '-pug'));
  gulp.watch('./source/templates/' + argv.template + '/layout/helpers/*.pug', gulp.series(argv.template + '-pug'));
  gulp.watch('./source/templates/' + argv.template + '/layout/instances/*.pug', gulp.series(argv.template + '-pug'));
  gulp.watch('./source/templates/' + argv.template + '/layout/_template.pug', gulp.series(argv.template + '-pug'));
  gulp.watch('./source/templates/' + argv.template + '/images/**/*.*', gulp.series(argv.template + '-copy:image'));
  gulp.watch('./source/templates/' + argv.template + '/fonts/**/*.*', gulp.series(argv.template + '-copy:fonts'));
  gulp.watch('./source/templates/' + argv.template + '/icons/*.*', gulp.series(argv.template + '-svgSprite'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    templates.map(function (name) {
      return name + '-build';
    })
  )
));
//
// gulp.task('single', gulp.series(
//   'clean',
//   gulp.parallel(
//     argv.template + '-build'
//   ),
//   gulp.parallel(
//     'watch',
//     'serve'
//   )
// ));
