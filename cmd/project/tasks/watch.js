/*
 *  @task      ADD
 *
 *  @action    ADD
 *  @command   PROJECT
 */
'use strict'

var gulp       = require('gulp')
  , gulpGulp   = require('gulp-gulp')
  , join       = require('path').join
  , basename   = require('path').basename
;

module.exports = function(source, onErr, onEnd) {

    var pluginPath  = process.cwd() + '/plugins/my-plugin'
    var pluginGulp  = process.cwd() + '/plugins/my-plugin/gulpfile.js'
    var changedFile = ''

    gulp.task('watch', function(done){
        gulp.watch([pluginPath + '/src', pluginPath+'/src/**/*'], ['move'])

        gulp.src(source)
            .pipe(gulpGulp('watch'))
            .on('error', onErr(done))
            .on('end', onEnd(done))
    })

    gulp.task('move', ['build'], function(done){
        gulp.src(pluginPath + '/dist/system/**/*')
            .pipe(gulp.dest(process.cwd() + '/projects/try/jspm_packages/github/aurelia-interface/my-plugin@master/'))
            .on('end', function(e){
                done()
                console.log(pluginPath + '/dist/system/' + changedFile + ' -> '+process.cwd() + '/projects/try/jspm_packages/github/aurelia-interface/my-plugin@master/')

                console.log('File ' + changedFile + ' Moved')
            })
    })

    gulp.task('build', function(done){
        gulp.src(pluginGulp)
            .pipe(gulpGulp('build'))
            .on('end', function(){
                console.log('Building Plugin')
                done()
            })
    })

    return gulp;
};
