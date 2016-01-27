'use strict';

const gulp = require('gulp');
const config = require('../configs/index').copy;

gulp.task('copy', function(){
  gulp.src(config.src).pipe(gulp.dest(config.dest))
});
