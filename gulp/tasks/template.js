const gulp = require('gulp')
const pug = require('gulp-pug')
const minimist = require('minimist')
const plumber = require('gulp-plumber')

var config = require('../configs/development').template

const env = minimist(process.argv.slice(2)).env
if(env === 'production') config = require('../configs/production').template

gulp.task('template', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(pug(config.options))
    .pipe(gulp.dest(config.dest))
})
