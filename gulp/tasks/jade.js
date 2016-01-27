'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const config = require('../configs/index').jade;

gulp.task('jade', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(jade(config.options))
    .pipe(gulp.dest(config.dest)); 
});
