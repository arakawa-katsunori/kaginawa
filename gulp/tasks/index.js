var gulp = require('gulp');

gulp.task('default', [
  'jade',
  'sass',
  'script',
  'copy'
]);

gulp.task('watch', [
  'jade',
  'sass',
  'script',
  'copy',
  'serve'
]);
