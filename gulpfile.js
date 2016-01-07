var gulp = require('gulp');
var sass = require('gulp-sass');

// compile scss files
gulp.task('sass', function () {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
});

gulp.task('watch', function () {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
});
