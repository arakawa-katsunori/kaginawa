const gulp = require('gulp')

gulp.task('run', [
  'template',
  'style',
  'script',
  'assets',
  'watch'
])

gulp.task('build', [
  'template',
  'style',
  'script',
  'assets'
])
