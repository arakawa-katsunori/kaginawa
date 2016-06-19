'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const config = require('../configs/index').pug;

gulp.task('pug', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(pug(config.options))
    .pipe(gulp.dest(config.dest)); 
});
