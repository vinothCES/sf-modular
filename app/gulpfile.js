'use strict';
var gulp = require('gulp'),
    config = require('./gulp.config')(),
    bs = require('browser-sync').create();


var $ = require('gulp-load-plugins')({lazy: true});

//task to do code analysis
gulp.task('lint-js', function () {
  log('Analysing javascript files with JSHINT and JSCS');

  return gulp
    .src(config.moduleSrc)
    .pipe($.print())
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function() {
  log('Wiring bower and custom dependencies');
  var wiredep = require('wiredep').stream,
      options = config.getWiredepOptions();
  
  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.injectSrc, {read: false}), {relative: true}))
    .pipe(gulp.dest(config.home));
});

gulp.task('sync', ['lint-js'], function() {
  log('Browser Sync started');
  bs.init({
    server: {
      baseDir: './'
    }
  });
});

//task to watch js files
gulp.task('watch', function () {
  log('Watching for files');

  return gulp
    .watch([config.allFiles], ['sync']);
});

//
//    Custom Methods
//

//method to log messages
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}