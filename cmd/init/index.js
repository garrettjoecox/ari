var
/*
 *     Dependencies
 *
 */
        ask        = require('inquirer').prompt
      , prompts    = require('./prompts')
      , write      = require('fs-utils').writeJSON
      , configPath = process.cwd() + '/.ari-config.json'
      , logger     = require('../../lib/logger')
      , Err        = logger.Err
      , Ok         = logger.Ok
;
module.exports.run = (function(){

    return function(){

        ask(prompts, save)

        function save(answers) {
            var config = {
                  name : answers.name
                , root : process.cwd()
                , projects : {}
                , plugins  : {}
                , using    : {}
                , holding  : {}
                , paths    : {
                    holding   : "/.holding",
                    templates : "/templates"
                  }
            }
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
            Ok('${a} has been initialize')
            Ok('')
            process.exit()
        }
    }
})()
