var gulp     = require('gulp');

var SRC_JS_FILES  = ['./src/**/*.js'];
var APP_JS_FILES = ['./public/js/app.js'];
var APP_CSS_FILES = ['./public/css/app.css'];
var LIB_JS_FILES = [
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/react/react.min.js'
];
var LIB_CSS_FILES = [
  './bower_components/ratchet/dist/css/ratchet.min.css'
];
var LIB_FONT_FILES = [
  './bower_components/ratchet/dist/fonts/*'
];

gulp.task('frontend:app:js', function () {
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');

  return gulp.src(APP_JS_FILES)
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('frontend:app:css', function () {
  var rename = require('gulp-rename');
  var csso   = require('gulp-csso');

  return gulp.src(APP_CSS_FILES)
    .pipe(rename('app.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('frontend:lib:js', function () {
  var concat = require('gulp-concat');

  return gulp.src(LIB_JS_FILES)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('frontend:lib:css', function () {
  var concat = require('gulp-concat');

  return gulp.src(LIB_CSS_FILES)
    .pipe(concat('lib.min.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('frontend:lib:font', function () {
  return gulp.src(LIB_FONT_FILES).pipe(gulp.dest('./public/fonts'));
});

gulp.task('backend', function() {
  var babel   = require('gulp-babel');

  return gulp.src(SRC_JS_FILES)
    .pipe(babel({
      experimental : false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(APP_JS_FILES, function() {
    gulp.start('frontend:app:js');
  });

  gulp.watch(APP_CSS_FILES, function() {
    gulp.start('frontend:app:css');
  });

  gulp.watch(SRC_JS_FILES, function() {
    gulp.start('backend');
  });
});

gulp.task('build', function () {
  gulp.start('frontend:lib:js', 'frontend:lib:css', 'frontend:lib:font', 'frontend:app:js', 'frontend:app:css', 'backend');
});

gulp.task('lint', function() {
  var eslint = require('gulp-eslint');

  return gulp.src(SRC_JS_FILES)
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
