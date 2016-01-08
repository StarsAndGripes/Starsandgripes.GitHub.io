var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var del = require('del');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

gulp.task('build', function(callback) {
  console.log('building files you magnificent bastard');
  runSequence('clean:dist',
    ['sass', 'images', 'fonts', 'useref'],
    callback
    )
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/assets/scss/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/assets/js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['build', 'watch'],
  callback
  )
});

//components
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function () {
  return gulp.src('app/**/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist')
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function () {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

