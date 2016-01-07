var browserSync = require('browser-sync');
var gulp = require('gulp');
var haml = require('gulp-haml');
var sass = require('gulp-sass');

// compile scss files
gulp.task('sass', function () {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('haml', function () {
  return gulp.src('app/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//browser sync
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
