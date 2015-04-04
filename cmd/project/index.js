'use strict'



var
/*
    VAR
 */
      log        = console.log
    , path       = require('path')
    , templates  = path.join.bind(path, path.join(__dirname, '../templates'))
    , gulp       = require('gulp')
    , color      = require('colors')
    , gulpTemplate = require('gulp-template')
    , rename     = require('gulp-rename')
    , _          = require('lodash')
    , lib        = require('../../lib')
    , logger     = lib('logger')
    , Err        = logger.Err
    , Ok         = logger.Ok
;

var PROJECT = module.exports = (function(){

    var
    /*
        Private
     */
          config
        , args
        , project
        , action
        , target
        , name
        , dest
        , source
        , filter
        , defaults
        , msgs       = {
            action : {
                  error:'Action ${a} Not found'
                , ok   :'Action ${a} found'
            },
            target : {
                  error:'Target ${a} Not found'
                , ok   :'target ${a} found'
            },
            name : {
                error:color.red('Name '+name+' Not found'),
                ok   :color.green('Name '+name+' found'),
            },
            validated :{
                  error : 'Issue validating project ${a}'
                , ok    : 'Command project ${a} Validated'
            }
          }
        , actions = {
              add     : use('add')
            , del     : use('delete')
            , delete  : use('delete')
          }
        , targets = {
              class     : 'class'
            , element   : 'element'
            , attribute : 'attribute'
            , attr      : 'attribute'
          }
    ;

    return run

    function run(){

        /*
            [ai] [Error]: Command add found and using project
         */
        config  = process.ARI.config;
        args    = process.ARI.args;
        project = config.projects[args[1]];
        action  = String(args[2]);
        target  = String(args[3]);
        name    = String(args[4]);
        return this.validate();
    }

    function validate(){

        (action && actions[action]) ? Ok(msgs.action.ok, action) : (Err(msgs.action.error, action), exit())
        (target && targets[target]) ? Ok(msgs.target.ok, target) : (Err(msgs.target.error, action), exit())

        (name) ? log(msgs.name.  ok) : (log(msgs.name.  error), exit())

        Ok(msgs.validated.ok, project.name)

        return this.finish()
    }

    function finish() {
        return actions[action]()(config, project, action, target, name);
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


})();
