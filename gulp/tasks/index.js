'use strict';

const gulp = require('gulp');

gulp.task('default', [
  'jade',
  'sass',
  'script',
  'copy'
]);

gulp.task('run', [
  'jade',
  'sass',
  'script',
  'copy',
  'watch'
]);

gulp.task('build', [
  'clean',
  'jade',
  'sass',
  'script',
  'copy'
]);
