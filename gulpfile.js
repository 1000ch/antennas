var gulp     = require('gulp');
var SRC_FILES  = ['./src/**/*.js'];
var APP_FILES = ['./public/js/app.js'];
var LIB_FILES = [
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/react/react.min.js'
];

gulp.task('frontend:app', function () {
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');

  return gulp.src(APP_FILES)
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('frontend:lib', function () {
  var concat = require('gulp-concat');

  return gulp.src(LIB_FILES)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('backend', function() {
  var babel   = require('gulp-babel');

  return gulp.src(SRC_FILES)
    .pipe(babel({
      experimental : false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(APP_FILES, function() {
    gulp.start('frontend:app');
  });

  gulp.watch(SRC_FILES, function() {
    gulp.start('backend');
  });
});

gulp.task('build', function () {
  gulp.start('frontend:lib', 'frontend:app', 'backend');
});

gulp.task('lint', function() {
  var eslint = require('gulp-eslint');

  return gulp.src(SRC_FILES)
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
