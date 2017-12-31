'use strict';

let gulp = require('gulp'),
  config = require('./gulp/config'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  gp = require('gulp-load-plugins')({
    recl: {
      'gulp-svg-sprite': 'svgSprite',
      'gulp-sass-glob': 'sassGlob',
      'gulp-sourcemaps': 'sourcemaps'
    }
  }),
  argv = require('yargs').argv,
  json = require('./gulp/clients.json'),
  jsonMap = json.templates.map(function (clientObj) {
    return clientObj;
  });


argv.template = 'template1';
jsonMap.forEach(function (tpl) {
  let pugFiles = tpl.inputFiles.map(function (el) {
    return config.srcDir + tpl.template + '/layout/instances/' + el
  });

  gulp.task(tpl.template+tpl.client + '-copy:fonts', function () {
    return gulp.src(config.srcDir + tpl.template + '/images/**/*.*')
      .pipe(gulp.dest(config.root + tpl.client + '/' + tpl.template + '/assets/fonts'))
  });

  gulp.task(tpl.template+tpl.client + '-copy:image', function () {
    return gulp.src(config.srcDir + tpl.template + '/images/**/*.*')
      .pipe(gulp.dest(config.root + tpl.client + '/' + tpl.template + '/assets/img'))
  });

  gulp.task(tpl.template+tpl.client + '-js:process', function () {
    return gulp.src(config.srcDir + tpl.template + '/js/*.*')
      .pipe(gp.concat('app.js',
        {rebaseUrls: false}))
      .pipe(gp.uglify())
      .pipe(gulp.dest(config.root + tpl.client + '/' + tpl.template + '/assets/js'))
  });

  gulp.task(tpl.template+tpl.client + '-pug', function () {
    return gulp.src(pugFiles)
      .pipe(gp.pug(config.pugConfig))
      .on('error', gp.notify.onError(function (error) {
        return {
          title: 'Pug',
          message: error.message
        }
      }))
      .pipe(gulp.dest(config.root + tpl.client + '/' + tpl.template))
  });

  gulp.task(tpl.template+tpl.client + '-sass', function () {
    return gulp.src(config.srcDir + tpl.template + '/style/app.scss')
      .pipe(gp.sassGlob())
      .pipe(gp.sourcemaps.init())
      .pipe(gp.sass()).on('error', gp.notify.onError({title: 'Style'}))
      .pipe(gp.autoprefixer({browsers: config.autoprefixerConfig}))
      .pipe(gp.csso())
      .pipe(gp.sourcemaps.write())
      .pipe(gulp.dest(config.root + tpl.client + '/' + tpl.template +'/assets/css'))
      .pipe(browserSync.stream());
  });

  gulp.task(tpl.template+tpl.client + '-svgSprite', function () {
    return gulp.src(config.srcDir + tpl.template + '/icons/*.svg')
      .pipe(gp.svgSprite({
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg'
          }
        }
      }))
      .pipe(gulp.dest(config.root + tpl.client + '/' + tpl.template +'/assets/icons'))
  });

  gulp.task(tpl.template +tpl.client+ '-build', gulp.parallel(tpl.template+tpl.client + '-copy:fonts', tpl.template+tpl.client + '-copy:image', tpl.template+tpl.client + '-js:process', tpl.template+tpl.client + '-pug', tpl.template+tpl.client + '-sass', tpl.template+tpl.client + '-svgSprite'));
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
    jsonMap.map(function (tpl) {
      return tpl.template+tpl.client + '-build';
    })
  )
));

