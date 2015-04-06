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
    , getters    : []
    , setters    : []
    , prototypes : []
    , params     : []
};

module.exports = function(options) {


    var dest         = options.dest,
        filter       = defaults,
        source       = __dirname + '/template/**/*'
    ;

    filter.names = {
        class   : capitalize(camelCase(options.name)),
        kebab   : kebabCase(options.name)
    };

    ask(options.prompts('class'), function(answers){
        task(extend(filter, answers)).start('add');
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
