/*
 * @command   PROJECT
 *
 */
'use strict'


var logger     = require('../../lib/logger')
  , Err        = logger.Err
  , Ok         = logger.Ok
  , actions = {
          add     : './add'
        , del     : './delete'
        , delete  : './delete'
    }

  , targets = {
          class     : 'class'
        , element   : 'element'
        , attribute : 'attribute'
        , attr      : 'attribute'
    }
;

module.exports = function(){

    var config  = process.ARI.config
      , args    = process.ARI.args
      , project = config.projects[args[1]]
      , action  = String(args[2])
      , target  = String(args[3])
      , name    = String(args[4])
    ;

    validate();

    /*
        VALIDATE
     */
    function validate(){

        if (!action && !actions[action]) {
            Err('')
            Err('Action ${a} not found!', action)
            Err('')
            exit()
        }

        if (!target && !targets[target]) {
            Err('')
            Err('Target ${a} not found!', target)
            Err('')
            exit()
        }

        if (!name) {
            Err('')
            log('Name ${a} not found!', name)
            Err('')
            exit()
        }

        Ok('Command project ${a} Validated', project.name)

        return finish()
    }

    /*
        FINISH
     */
    function finish() {
        return require(actions[action])(config, project, action, target, name);
    }

    /*
     *    Helpers
     */
    function exit(num){
        num = num || 0;
        process.exit(num)
    }

    function use(val){
        return function(){
            return require(__dirname + '/'+val)
        }
    }


}
