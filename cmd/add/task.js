var gulp     = require('gulp')
var template = require('gulp-template')

module.exports = function(source, dest, filter, onEnd, onError){

    gulp.task('add', function(done){

        gulp.src(source)
            // .pipe(template(filter))
            .pipe(gulp.dest(dest))
            .on('end', onEnd(done))
            .on('error', onError(done))
    })

    return gulp
}
