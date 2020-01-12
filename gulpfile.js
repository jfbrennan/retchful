const gulp = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

function buildComponentsFile() {
  return gulp.src('index.js')
    .pipe(concat('min.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist'))
}

exports.buildComponentsFile = buildComponentsFile;
exports.build = gulp.series(buildComponentsFile);
