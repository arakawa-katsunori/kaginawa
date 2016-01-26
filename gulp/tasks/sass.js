var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var config = require('../configs/index').sass;

gulp.task('sass', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(config.autoprefixer) ]))
    .pipe(nano({discardComments: {removeAll: true}}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest)
  ); 
});
