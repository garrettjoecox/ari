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
    , color      = require('colors')
    , inflection = require('inflection')
    , mkdirp     = require('mkdirp')
    , _f         = require('fs-utils')
    , selectors  = {
          plugin:'plugin'
        , project:'project'
      }
    , log        = console.log

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
            var dest = this.config.root + this.config[plural.selector][target].path;

            log(color.blue('Deleting '+ selector + ' -> '+ target))

            delete this.config[plural.selector][target];

            del(dest, function (err, deletedFiles) {
                _f.writeJSONSync(this.configPath, this.config);
                log(color.green(selector + ' -> '+ target +' Removed '))
                log(color.red('Files deleted:'), color.red(deletedFiles.join(', ')));
                process.exit(0)
            }.bind(this));
        };

    return {
          finish:finish
        , run:run
    }

})();
