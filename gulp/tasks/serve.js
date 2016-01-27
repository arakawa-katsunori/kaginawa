'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const config = require('../configs/index');

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
    proxy: "http://localhost:3333",
    port: 4444,
    files: ['./www/']
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(config.js.src, ['script', browserSync.reload]);
  gulp.watch(config.jade.src, ['jade']);
  gulp.watch(config.sass.src, ['sass']);
});
