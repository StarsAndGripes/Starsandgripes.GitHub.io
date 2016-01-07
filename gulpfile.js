var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var haml = require('gulp-haml');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('build', function () {
  return gulp.src('app/**/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function() {
  return.gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('haml', function () {
  return gulp.src('app/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
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

gulp.task('watch', ['browserSync', 'haml', 'sass'], function () {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.haml`', ['haml']);
  gulp.watch('app/*.html`', browserSync.reload);
  gulp.watch('app/js/**/*.js`', browserSync.reload);
});
