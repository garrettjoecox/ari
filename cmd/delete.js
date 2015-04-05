
var Ari = process.ARI;
var name = Ari.args[2];
var del = require('del');
var selector = Ari.args[1];
var pselector = selector + 's';
var types = { project:true, plugin:true };
var write = require('fs-utils').writeJSONSync;

module.exports = function(){

    if (!selector){
        Ari.err();
        Ari.err('Please provide a selector and a name!', selector);
        Ari.err('$ ari add [project/plugin] [name]');
        Ari.err();
        process.exit(0);
    }

    if (!types[selector]){
        Ari.err();
        Ari.err('Invalid type: ${a}', selector);
        Ari.err('Valid types: project / plugin');
        Ari.err();
        process.exit(0);
    }

    if (!Ari.config[pselector][name]){
        Ari.err();
        Ari.err("The ${a} ${b} doesn't exist!", selector, name);
        Ari.err('Please try again');
        Ari.err();
        process.exit(0);
    }

    var dest = Ari.config.root + Ari.config[pselector][name].path;
    delete Ari.config[pselector][name];
    write(Ari.config.path, Ari.config);
    del(dest, function(err){
        if (err){
            Ari.err();
            Ari.err('There was an issue deleting the ${a} ${b}', selector, name);
            Ari.err();
        } else {
            Ari.ok();
            Ari.ok('Finished deleting the ${a} ${b}', selector, name);
            Ari.ok();
        }
    });
};
