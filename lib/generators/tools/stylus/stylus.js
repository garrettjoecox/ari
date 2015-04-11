var gulp    = require('gulp');
var stylus  = require('gulp-stylus');
var plumber = require('gulp-plumber');
var concat  = require('gulp-concat');
var paths   = require('../paths');

gulp.task('stylus', function(){
    return gulp.src(paths.stylus.index)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(concat('app.css'))
        .pipe(plumber.stop())
        .pipe(path.output + 'css')
});

