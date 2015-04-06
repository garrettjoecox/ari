var extend     = require('lodash/object/extend')
  , kebabCase  = require('lodash/string/kebabCase')
  , capitalize = require('lodash/string/capitalize')
  , camelCase  = require('lodash/string/camelCase')
  , gTemplate  = require('gulp-template')
  , gRename    = require('gulp-rename')
  , gulp       = require('gulp')
  , ask        = require('inquirer').prompt
  , Ari        = process.ARI
  , Ok         = Ari.ok
  , Err        = Ari.err
;

var defaults = {

      name       : ''
    , imports    : []
    , exporting  : true
    , inherits   : false
    , inject     : []
    , getters    : []
    , setters    : []
    , prototypes : []
    , params     : []
    , metadata   : []
    , view       : false
};

module.exports = function(options) {


    var dest         = options.dest,
        filter       = defaults,
        src          = __dirname + '/template/',
        source       = [];
    ;

    filter.names = {
        class   : capitalize(camelCase(options.name)),
        kebab   : kebabCase(options.name)
    };

    ask(options.prompts('attribute'), function(answers){
        extend(filter, answers);
        filter.imports.unshift({name:'Behavior', from:'aurelia-templating'});
        filter.inject.unshift('Element');
        filter.params.unshift('element');

        source.push(src + 'model/*')

        if (filter.view) {
          source.push(src+'view/*')
        }

        task(filter).start('add');
    });


    /*
        GULP TASK
     */
    function task(filters){
        return gulp
            .task('add', function(done){
                gulp.src(source)
                    .pipe(gTemplate(filters))
                    .pipe(gRename( renameFile ))
                    .pipe(gulp.dest(dest))
                    .on('error', onError(done))
                    .on('end', onEnd(done))
            })
    }

    /*
        ON ERROR
     */
    function onError(cb) {
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
            Ok('Finished creating ${a} ${b}', options.target, filter.name)
            process.exit(0)
        }
    }


    /*
        RENAME
     */
    function renameFile(file) {

        (file.basename === '_') && ( file.basename = filter.names.kebab );
        return file;
    }


};
