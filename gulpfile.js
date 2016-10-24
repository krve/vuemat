var gulp            = require('gulp');
var watch           = require('gulp-watch');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var webpack         = require('gulp-webpack');
var browserSync     = require('browser-sync').create();
var reload          = browserSync.reload;

gulp.task('default', ['js', 'scss'])

gulp.task('js', function() {
    return gulp.src("src/js/app.js")
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(concat('app.js'))
        .pipe(gulp.dest("dist/js/"))
        .on('error', swallowError);
});

gulp.task('scss', function() {
    return gulp.src("src/scss/app.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('js-watch', ['js'], function() {
    browserSync.reload();
});

gulp.task('scss-watch', ['scss'], function() {
    browserSync.reload();
});

gulp.task('serve', ['js', 'scss'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist"

        },
        notify: false
    });

    gulp.watch('js/**/*.js', ['js-watch']);
    gulp.watch('scss/**/*.scss', ['scss-watch']);
    gulp.watch('*.html').on('change', reload);
});


function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}
