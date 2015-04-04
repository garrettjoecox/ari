/*
 *  @action    ADD
 *
 *  @command   PROJECT
 */

'use strict'

/*
 *  Dependencies
 */
var path = require('path')
    , templates    = path.join.bind(path, path.join(__dirname, '../../templates'))
    , settings     = require('./settings/add')
    , prompts      = require('./prompts/add')
    , logger       = require('../../lib/logger')
    , extend       = require('lodash/object/extend')
    , ask          = require('inquirer').prompt
    , Err          = logger.Err
    , Ok           = logger.Ok
;
module.exports = function(config, project, action, target, name){

    /*
     *  Locals
     *  @source    the final source path for gulp to grab
     *  @sourceDir source dir path for source
     *  @dest      the destination for gulp.dest
     */
    var source
      , dest      = path.join(config.root, (project.path || '/projects/'+project.name), 'src', name)
      , filter
      , task      = require('./tasks/add')
      , sourceDir = templates(target)
    ;

    settings  = settings(target, name)
    source    = sourceDir + settings.glob.all
    filter    = settings.filter

    filter.name  = name
    filter.names = settings.names

    ask(prompts(target), start);

    /*
        START
     */
    function start(answers){
        extend(filter, answers)
        task(source, dest, filter, onErr, onEnd).start('add')
    }


    /*
        ON ERROR
     */
    function onErr(cb) {
        return function(){
            cb()
            Err('Issue adding ${a}', filter.name)
            process.exit(0)
        }
    }

    /*
        ON END
     */
    function onEnd(cb) {
        return function(){
            cb();
            Ok('Finished creating ${a} ${b}', target, filter.name)
            process.exit(0)
        }
    }
}
