const gulp = require('gulp')
const minimist = require('minimist')
var config = require('../configs/development').assets

const env = minimist(process.argv.slice(2)).env
if(env === 'production') config = require('../configs/production').assets

gulp.task('assets', () => {
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
})
