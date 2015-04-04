
module.exports = function(){

    var Err = require('../lib/logger').Err;
    var Ok = require('../lib/logger').Ok;
    var del = require('del');
    var selector = process.ARI.args[1];
    var action = process.ARI.args[0];
    var target = process.ARI.args[2];
    var pselector = selector + 's';
    var mkdirp = require('mkdirp');
    var _f = require('fs-utils');

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

    if (!process.ARI.config[pselector][target]){
        Err('');
        Err('The ${a} ${b} does not exist!', selector, target);
        Err('Please try again');
        Err('');
        return;
    }

    var dest = process.ARI.config.root + process.ARI.config[pselector][target].path;
    delete process.ARI.config[pselector][target];
    _f.writeJSONSync(process.ARI.configPath, process.ARI.config);
    del(dest, function(err){
        if (err){
            Err('');
            Err(err);
            Err('');
        } else {
            Ok('The ${a} ${b} has been deleted!', selector, target);
        }
    })
}
