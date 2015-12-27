var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var cssnext = require('gulp-cssnext');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify-css');
var config = require('../configs/index').sass;

gulp.task('sass', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(cssnext(config.cssnext))
    .pipe(gulpif(config.minify, minify()))
    .pipe(gulp.dest(config.dest)
  ); 
});
