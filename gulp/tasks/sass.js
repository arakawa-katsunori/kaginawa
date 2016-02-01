'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const nano = require('gulp-cssnano');
const minimist = require('minimist');
const config = require('../configs/index').sass;

const args = minimist(process.argv.slice(2));
const env = args.env;

gulp.task('sass', function () {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(config.autoprefixer) ]))
    .pipe(gulpif((env === 'production'), nano({discardComments: {removeAll: true}})))
    .pipe(gulpif(!(env === 'production'), sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest)
  ); 
});
