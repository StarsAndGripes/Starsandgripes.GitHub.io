var browserSync = require('browser-sync');
    cssnano = require('gulp-cssnano');
    del = require('del');
    gulp = require('gulp');
    gulpIf = require('gulp-if');
    imagemin = require('gulp-imagemin');
    neat = require('node-neat').includePaths;
    runSequence = require('run-sequence');
    sass = require('gulp-sass');
    uglify = require('gulp-uglify');
    useref = require('gulp-useref');

var paths = {
    scss: './app/scss/*.scss',
    html: './app/*.html',
    js: './app/js/**/*.js'
};

gulp.task('build', function(callback) {
  console.log('building files you magnificent bastard');
  runSequence('clean:dist',
    ['sass', 'images', 'fonts', 'useref'],
    callback
    )
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
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
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg|ico)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
        includePaths: ['sass'].concat(neat)
      }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

