/*
    ari add [selector] [name]
 */

'use strict';
var
    /*
        Vars
     */
      selector
    , action
    , target
    , plural
    , del        = require('del')
    , rimraf     = require('gulp-rimraf')
    , moment     = require('moment')
    , color      = require('colors')
    , inflection = require('inflection')
    , mkdirp     = require('mkdirp')
    , _f         = require('fs-utils')
    , es         = require('event-stream')
    , gulp       = require('gulp')
    , join       = require('path').join
    , selectors  = {
          plugin:'plugin'
        , project:'project'
      }
    , log        = console.log
    , templates  = {
        plugin  : 'skeleton-plugin',
        project : 'skeleton-navigation'

      }
    , DELETE;

DELETE = module.exports = (function(){
    var

    /*
        Methods
     */
        run = function() {
            action   = this.args[0];
            selector = this.args[1];
            target   = this.args[2];

            plural = {
                selector: inflection.pluralize(selector)
            }

            if (!selectors[selector]) {
                log('No Selector Found'.red)
                log('Please provide a selector'.blue)
                log(color.blue('ari '+action+' <plugin | project> [target]'))
                process.exit(0);
            }
            log(color.green('Selector found '+selector))

            if (!target) {
                log('No target found'.red)
                log(color.blue('Please provide a target'))
                log(color.blue('ari '+action+' '+selector+' [target]'));
                process.exit(0);
            }
            log(color.green('Target found '+target))


            if (!this.config[plural.selector][target]) {
                log(color.red(selector+' '+target+ ' Does not exists!'))
                log(color.blue('Please choose another name'))
                process.exit(0);
            }

            log(color.green('Target exists continue!'))

            this.finish()

        },

        finish = function(){

            var _this  = this
              , source = this.config.root + this.config[plural.selector][target].path
              , dest   = this.config.root + this.config.paths.holding + this.config[plural.selector][target].path
              , time   = moment().format('MMM-DD-YY-h-mm-ss-a')
              ;
            this.config.holding = this.config.holding || {};
            this.config.holding[plural.selector] = this.config.holding[plural.selector] || {};
            this.config.holding[plural.selector][target] = this.config[plural.selector][target]

            gulp.src(source + '/**/*')
                .pipe(gulp.dest(dest + '/' + target +'-'+time))
                .on('end', function(){

                    log(color.green(selector + ' -> '+ target +' Copied '))
                    return gulp.src(source + '/**/*')
                        .pipe(rimraf({force:true}))
                        .on('finish', function(){

                            log(color.green(selector + ' -> '+ target +' Removed '))
                            return gulp.src(_this.config.root + _this.config.paths.templates + '/' + templates[selector] + '/**/*')
                                .pipe(gulp.dest(source))
                                .on('end', function(){

                                    log(color.blue('Project recreated:'));
                                    _f.writeJSONSync(_this.configPath, _this.config);
                                });
                        });
                });
        };

    return {
          finish:finish
        , run:run
    }

})();
