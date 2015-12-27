var gulp = require('gulp');
var  gulpif = require('gulp-if');
var  uglify = require('gulp-uglify');
var  plumber = require('gulp-plumber');
var  webpack = require('webpack-stream');
var  config = require('../configs/index');

gulp.task('script', function () {
  gulp.src(config.webpack.entry)
    .pipe(plumber())
    .pipe(webpack(config.webpack))
    .pipe(gulpif(config.js.uglify, uglify()))
    .pipe(gulp.dest(config.js.dest)); 
});
