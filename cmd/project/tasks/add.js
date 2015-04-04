/*
 *  @task      ADD
 *
 *  @action    ADD
 *  @command   PROJECT
 */
'use strict'

var gulpTemplate = require('gulp-template')
    , rename     = require('gulp-rename')
    , gulp       = require('gulp')
;

module.exports = function(source, dest, filter, onErr, onEnd) {

    gulp.task('add', function(done){

        gulp.src(source)
            .pipe(gulpTemplate(filter))
            .pipe(rename( renameFile ))
            .pipe(gulp.dest(dest))
            .on('error', onErr(done))
            .on('end', onEnd(done))
    })

    return gulp;

    /*
        RENAME
     */
    function renameFile(file) {

        (file.basename === '_') && ( file.basename = filter.names.kebab );
        return file;
    }
};
