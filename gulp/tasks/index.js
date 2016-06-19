'use strict';

const gulp = require('gulp');

gulp.task('default', [
  'pug',
  'sass',
  'script',
  'copy'
]);

gulp.task('run', [
  'pug',
  'sass',
  'script',
  'copy',
  'watch'
]);

gulp.task('build', [
  'clean',
  'pug',
  'sass',
  'script',
  'copy'
]);
