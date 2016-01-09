var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var config = require('../configs/index');

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    script: './server/app.js',
    watch: ['./server/'],
    env: {
      TZ: 'UTC',
      NODE_ENV: 'development'
    }
  })
  .on('start', function onStart() {
    if (!called) { cb(); }
    called = true;
  })
  .on('restart', function onRestart() {
    setTimeout(function reload() {
      browserSync.reload({ stream: false });
    }, 500);
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 4000,
    browser: "google chrome",
    files: ['./www/']
  });
});

gulp.task('serve', ['browser-sync'], function() {
  gulp.watch(config.js.src, ['script', browserSync.reload]);
  gulp.watch(config.jade.src, ['jade']);
  gulp.watch(config.sass.src, ['sass']);
});
