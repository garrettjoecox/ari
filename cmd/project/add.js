var
/*
    Dependencies
 */

      path = require('path')
    , extend = require('lodash/object/extend')
    , gulpTemplate = require('gulp-template')
    , rename     = require('gulp-rename')
    , gulp       = require('gulp')
    , logger     = require('../../lib/logger')
    , Err        = logger.Err
    , Ok         = logger.Ok
    , templates  = path.join.bind(path, path.join(__dirname, '../../templates'))
    , settings   = require('./settings/add')
    , ask        = require('inquirer').prompt
    , prompts    = require('./prompts/add')

;
module.exports = function(config, project, action, target, name){

    var
    /*
     *  Locals
     *  @source    the final source path for gulp to grab
     *  @sourceDir source dir path for source
     *  @dest      the destination for gulp.dest
     */
          source
        , filter
        , sourceDir = templates(target)
        , dest      = path.join(config.root, (project.path || '/projects/'+project.name), 'src', name);
    ;

    settings  = settings(target, name)
    source    = sourceDir + settings.glob.all
    filter    = settings.filter

    ////////////////////////////////

    filter.name  = name
    filter.names = settings.names

    ask(prompts(target), function(answers){
        extend(filter, answers)
        start()
    });

    function start(){
        gulp.start('add');
    }

    gulp.task('add', function(done){
        gulp.src(source)
            .pipe(gulpTemplate(filter))
            .pipe(rename(function(file){
                if (file.basename === '_') {
                    file.basename = settings.names.kebab
                }
                return file;
            }))
            .pipe(gulp.dest(dest))
            .on('error', function(){
                Err('Issue adding ${a}', name)
            })
            .on('end', function(){
                done();
                Ok('Finished creating ${a} ${b}', target, name)
                process.exit(0)
            })
    })

}
