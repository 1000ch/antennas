var gulp     = require('gulp');

var FILE_TEST_RUNNER      = './test/runner.js';
var DIR_DIST = './dist';
var DIR_TEMP = './temp';

var GLOB_TEST_FILES = ['./test/**/*.js', '!./test/runner.js'];
var GLOB_SRC_FILES  = ['./src/**/*.js'];

gulp.task('lint', function() {
  var eslint   = require('gulp-eslint');

  return gulp.src(GLOB_SRC_FILES)
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pretest', function() {
  gulp.start('build', 'build-test');
});

gulp.task('watch', function() {
  gulp.watch(GLOB_SRC_FILES, function() {
    gulp.start('build');
  });
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');

  gulp.src(FILE_TEST_RUNNER)
    .pipe(gulp.dest(DIR_TEMP));

  return gulp.src(GLOB_TEST_FILES)
    .pipe(espower())
    .pipe(gulp.dest(DIR_TEMP));
});

gulp.task('build', function() {
  var babel   = require('gulp-babel');

  return gulp.src(GLOB_SRC_FILES)
    .pipe(babel({
      experimental : false
    }))
    .pipe(gulp.dest(DIR_DIST));
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');
  var babel   = require('gulp-babel');

  return gulp.src(GLOB_TEST_FILES)
    .pipe(babel({
      experimental : false
    }))
    .pipe(espower())
    .pipe(gulp.dest(DIR_TEMP));
});
