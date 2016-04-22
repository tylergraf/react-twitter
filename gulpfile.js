var gulp = require('gulp');
var nodemon = require('gulp-nodemon'),
    stylus = require('gulp-stylus');
    plumber = require('gulp-plumber');
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
  gulp.src('static/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./static/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('static/**/*.styl', ['styles']);
});

gulp.task('serve', function () {
  nodemon({
    script: './server.js',
    ext: 'js html',
    ignore: ['app','node_modules'],
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['styles','serve','watch']);
