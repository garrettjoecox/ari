var
/*
    Dependencies
 */

          path = require('path')
        , _    = require('lodash')
        , gulpTemplate = require('gulp-template')
        , rename     = require('gulp-rename')
        , gulp       = require('gulp')
        , lib        = require('../../lib')
        , logger     = lib('logger')
        , Err        = logger.Err
        , Ok         = logger.Ok
        , templates = path.join.bind(path, path.join(__dirname, '../../templates'))
        , defaults  = {
              name       : ''
            , imports    : [{name:'Behavior', from:'aurelia-templating'}]
            , exporting  : true
            , inherits   : false
            , getters    : ['age']
            , setters    : ['age']
            , prototypes : ['ageChanged']
            , params     : ['one', 'two']
          }
        , filters = {
              class   : defaults
            , element : {
                  imports    : [{name:'Behavior', from:'aurelia-templating'}]
                , metadata   : []
                , inject     : ['Element']
                , params     : ['element']
                , view       : true
              }
            , attribute : {
                  imports    : [{name:'Behavior', from:'aurelia-templating'}]
                , metadata   : []
                , inject     : ['Element']
                , params     : ['element']
                , view       : false
              }
            , resource : {
                index: true
              }
          }
        , dirs = {
              class: {
                all: '**/*'
              }
            , element : {
                  model: '/model/*'
                , view : '/view/*'
                , all  : '/**/*'
              }
        }
;
var ADD = module.exports = (function(){
    return function(config, project, action, target, name){

        var
              source
            , filter
            , sourceDir = templates(target)
            , dest    = path.join(config.root, (project.path || '/projects/'+project.name), 'src', name);
        ;

        source = sourceDir + dirs[target].all

        filter = _.extend(defaults, filters[target]);

        ////////////////

        gulp.task('add', function(done){
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
                    Ok('Finished creating ${a} ${b}', target, name)
                    process.exit(0)
                })
        })

        gulp.start('add');
    }


})()
