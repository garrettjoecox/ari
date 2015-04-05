var gulp   = require('gulp')
var shell  = require('gulp-shell')
var logger = require('../lib/logger')
var Err    = logger.Err
var Ok     = logger.Ok

module.exports = function() {
    var config  = process.ARI.config;
    var args    = process.ARI.args;
    var project = config.projects[args[1]]
    var plugin  = config.plugins[args[2]]

    if (!project) {
        Err('')
        Err('Project ${a} not found!', args[1])
        Err('')
        process.exit(0)
    }

    if (!plugin) {
        Err('')
        Err('Plugin ${a} not found!', args[2])
        Err('')
        process.exit(0)
    }

    link().start('link');

    function link() {
        gulp.task('link', shell.task([
              'cd plugins/'+plugin.name
            , 'jspm link -y'
            , 'cd '+config.root
            , 'cd projects/'+project.name
            , 'jspm install -link github:'+config.name + '/' + plugin.name + '@master'
            , 'cd '+config.root
        ]))

        return gulp
    }
}
