
var Ari = process.ARI;
var name = Ari.args[2];
var selector = Ari.args[1];
var pselector = selector + 's';
var types = { project:true, plugin:true };
var write = require('fs-utils').writeJSON;

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

    if (Ari.config[pselector][name]){
        Ari.err();
        Ari.err('The ${a} ${b} already exists!', selector, name);
        Ari.err('Try another name');
        Ari.err();
        process.exit(0);
    }

    Ari.config[pselector] = Ari.config[pselector] || {};
    Ari.config[pselector][name] = { name:name, path:'/' + pselector + '/' + name };

    var sourceRoot = Ari.config.root + '/templates/' + Ari.config.defaults.template[selector];
    var source = sourceRoot + '/**/*';
    var dest = Ari.config.root + Ari.config[pselector][name].path;

    require('./task.js')(source, dest, {name:name}, onEnd, onError).start('add');

    function onError(cb) {
        return function(){
            Ari.err();
            Ari.err('There was an issue creating the ${a} ${b}', selector, name);
            Ari.err();
            process.exit(0);
        };
    }

    function onEnd(cb) {
        return function(){
            write(Ari.config.path, Ari.config, function(err){
                if (err) {
                    onError(cb)();
                }
                Ari.ok();
                Ari.ok('Finished creating the ${a} ${b}', selector, name);
                Ari.ok();
                process.exit(0);
            });
        };
    }
};
