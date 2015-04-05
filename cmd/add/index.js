
module.exports = function(){

    var logger = require('../../lib/logger');
    var Err = logger.Err;
    var Ok = logger.Ok;
    var selector = process.ARI.args[1];
    var action = process.ARI.args[0];
    var target = process.ARI.args[2];
    var pselector = selector + 's';
    var mkdirp = require('mkdirp');
    var write = require('fs-utils').writeJSON
    var task     = require('./task.js')
    var source, dest

    var selectors = {
        project: 'projects',
        plugin: 'plugins'
    };

    if (!selectors[selector]){
        Err('');
        Err('Please provide a valid selector!');
        Err('-> ari add [project/plugin] [name]');
        Err('');
        return;
    }

    if (!target){
        Err('');
        Err('Please provide name!');
        Err('-> ari add [project/plugin] [name]');
        Err('');
        return;
    }

    if (process.ARI.config[pselector][target]){
        Err('');
        Err('The ${a} ${b} already exists!', selector, target);
        Err('Please try another name');
        Err('');
        return;
    }

    process.ARI.config[pselector] = process.ARI.config[pselector] || {};
    process.ARI.config[pselector][target] = { name:target, path:'/' + pselector + '/' + target };


    var sourceRoot = process.ARI.config.root + '/templates/' + process.ARI.config.defaults.template[selector]

    source = sourceRoot + '/**/*';
    dest = process.ARI.config.root + process.ARI.config[pselector][target].path;

    task(source, dest, {}, onEnd, onError).start('add');



    /////////////////////

    /*
        ON ERROR
     */
    function onError(cb) {
        return function(){
            Err('')
            Err('Issue running adding project -> ${a}', target)
            Err('')
            process.exit(0);
        }
    }


    /*
        ON END
     */
    function onEnd(cb) {
        return function(){
            write(process.ARI.configPath, process.ARI.config, function(err){
                if (err) {
                    onError(cb)()
                }
                Ok('')
                Ok('Finished creating project -> ${a}', target)
                Ok('')
                process.exit(0);
            });
        }
    }


    // mkdirp(process.ARI.config.root + '/' + process.ARI.config[pselector][target].path, function(err, result){
    //     if (err){
    //         Err('');
    //         Err(err);
    //         Err('');
    //     } else {
    //         Ok('The ${a} ${b} has been created!', selector, target);
    //     }
    // });
}
