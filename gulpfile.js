var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.src('angular-event.js')
    .pipe(uglify())
    .pipe(rename('angular-event.min.js'))
    .pipe(gulp.dest('./'));
});