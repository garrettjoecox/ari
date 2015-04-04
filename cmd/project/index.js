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
            }
          }
        , actions = {
              add     : 'add'
            , del     : 'del'
            , delete  : 'delete'
          }
        , targets = {
              class     : 'class'
            , element   : 'element'
            , attribute : 'attribute'
            , attr      : 'attribute'
          }
    ;

    return {
          run      : run
        , finish   : finish
        , validate : validate
    }

    function run(){

        /*

            [ai] [Error]: Command add found and using project
         */
        config  = this.config;
        args    = this.args;
        project = config.projects[args[1]];
        action  = args[2];
        target  = args[3];
        name    = args[4];
        return this.validate();
    }

    function validate(){

        (action && actions[action]) ? Ok(msgs.action.ok, action) : (Err(msgs.action.error, String(action)), exit())
        (target && targets[target]) ? Ok(msgs.target.ok) : (Err(msgs.target.error), exit())

        (name)   ? log(msgs.name.  ok) : (log(msgs.name.  error), exit())

        log('Command '.green+' project '.blue+project.name.blue+' Validated'.green)

        return this.finish()
    }

    function finish() {

        source  = templates(target + '/**/*')
        dest    = path.join(config.root, (project.path || '/projects/'+project.name), 'src', name);
        gulp.task('default', function(done){
            gulp.src(source)
                .pipe(gulpTemplate(filter))
                .pipe(rename(function(file){
                    if (file.basename === '_') {
                        file.basename = _.kebabCase(name)
                    }
                    return file
                }))
                .pipe(gulp.dest(dest))
                .on('end', function(){
                    done();
                    log('Finished creating '.green+target + ' '+name)
                    process.exit(0)
                })
        })

        gulp.start('default')
    }

    function exit(num){
        num = num || 0;
        process.exit(num)
    }


})();
