var
/*
    Dependencies
 */
          templates = path.join.bind(path, path.join(__dirname, '../../templates'))
        , defaults  = {
              name       : name
            , imports    : [{name:'Behavior', from:'aurelia-templating'}]
            , exporting  : true
            , inherits   : false
            , getters    : ['age']
            , setters    : ['age']
            , prototypes : ['ageChanged']
            , params     : ['one', 'two']
          }
        , filters = {}
              class   : {}
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
        , dirs : {
              class: '**/*'
            , element : {
                  model: 'model/*'
                , view : 'view/*'
              }
        }
;
var ADD = module.exports = (function(){
    return function(config, project, action, target, name){

        var
            sourceDir = templates(target)
        ;




    }

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
                log('Finished creating '.green+target + ' '+name)
                process.exit(0)
            })
    })
})()
