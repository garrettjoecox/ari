/*
    ari add [selector] [name]
 */

'use strict';
var
      selector
    , action
    , target
    , plural
    , color      = require('colors')
    , inflection = require('inflection')
    , mkdirp     = require('mkdirp')
    , _f         = require('fs-utils')
    , selectors  = {
          plugin:'plugin'
        , project:'project'
      }
    , log        = console.log

    , ADD;


ADD = module.exports = (function(){
    var
    /*
        Vars
     */



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


            if (this.config[plural.selector][target]) {
                log(color.red(selector+' '+target+ ' already exists!'))
                log(color.blue('Please choose another name'))
                process.exit(0);
            }

            log(color.green('Target does not exist continue'))

            this.finish()
            console.log(this.config)


        },

        finish = function(){

            this.config[plural.selector] = this.config[plural.selector] || {};
            this.config[plural.selector][target] = {name:target, path:'/'+plural.selector + '/' + target}
            _f.writeJSONSync(this.configPath, this.config);
            mkdirp(this.config.root + '/'+ this.config[plural.selector][target].path, function(err, result){
                if(err){
                    log(err.red)
                }
                log(result.green)
            })
        };

    return {
          finish:finish
        , run:run
    }

})();
