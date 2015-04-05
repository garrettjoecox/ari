var basename = require('path').basename
var fs       = require('fs')
var logger   = require('../../lib/logger')
var Err      = logger.Err
var Ok       = logger.Ok
var task     = require('./tasks/watch')

module.exports = function(config, project, action, target, name){

    var gulpFile = findGulp()

    if (!gulpFile) {
        Err('')
        Err('Gulpfile Not found in project -> ${a}', project.name)
        Err('')
        process.exit(0)
    }

    Ok('')
    Ok('${a} found for project -> ${b}', basename(gulpFile), project.name)
    Ok('')

    task(gulpFile, onErr, onEnd).start('watch')

    ///////////////////////


    /*
        FIND GULPFILE
     */
    function findGulp(cb){

        if (fs.existsSync(config.root + project.path + '/' + 'gulpFile.js')) {
            return fs.realpathSync(config.root + project.path + '/' + 'gulpfile.js')
        }
    }

    /*
        ON ERROR
     */
    function onErr(cb) {
        return function(){
            cb()
            Err('')
            Err('Issue watching ${a}', project.name)
            Err('')
            process.exit(0)
        }
    }

    /*
        ON END
     */
    function onEnd(cb) {
        return function(){
            cb();
            Ok('')
            Ok('Watching ${a}', project.name)
            Ok('')
            process.exit(0)
        }
    }

}
