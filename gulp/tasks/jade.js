var gulp = require('gulp');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var config = require('../configs/index').jade;

gulp.task('jade', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(jade(config.options))
    .pipe(gulp.dest(config.dest)); 
});
