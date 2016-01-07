var browserSync = require('browser-sync');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

gulp.task('haml', function () {
  return gulp.src('app/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('app'))
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

gulp.task('useref', function () {
  return gulp.src('app/**/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'haml', 'sass'], function () {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.haml`', ['haml']);
  gulp.watch('app/*.html`', browserSync.reload);
  gulp.watch('app/js/**/*.js`', browserSync.reload);
});
