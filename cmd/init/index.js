var
/*
 *     Dependencies
 *
 */
        ask        = require('inquirer').prompt
      , extend     = require('lodash/object/extend')
      , prompts    = require('./prompts')
      , write      = require('fs-utils').writeJSON
      , configPath = process.cwd() + '/.ari-config.json'
      , logger     = require('../../lib/logger')
      , Err        = logger.Err
      , Ok         = logger.Ok
;
module.exports = (function(){

    var config = process.ARI.config

    return function(){

        ask(prompts, save)

        function save(answers) {

            config.name     = answers.name;
            config.root     = process.cwd();
            config.paths    = config.paths    || {holding   : "/.holding", templates : "/templates"};
            config.projects = config.projects || {};
            config.holding  = config.holding  || {};
            config.plugins  = config.plugins  || {};
            config.using    = config.using    || {};

            write(configPath, config, finish);
        }

        function finish(err, result) {
            if (err) {
                Err('')
                Err(err)
                Err('')
                process.exit(0)
            }
            Ok('')
            Ok('${a} has been initialize', config.name)
            Ok('')
            process.exit()
        }
    }
})()
