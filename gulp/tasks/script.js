'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const config = require('../configs/index');

gulp.task('script', function () {
  gulp.src(config.webpack.entry)
    .pipe(plumber())
    .pipe(webpack(config.webpack))
    .pipe(gulp.dest(config.js.dest)); 
});
