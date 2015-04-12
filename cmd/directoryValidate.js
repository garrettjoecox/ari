
var Ari    = process.ARI;
var exists = require('fs').existsSync

module.exports = (function(){

    var fileName = '/.ari-config.json';
    var configPath = process.cwd().split('/');

    while(!exists(configPath.join('/') + fileName) && configPath.length) {
        configPath.pop();
    }

    configPath = configPath.join('/') + fileName;

    if (!exists(configPath)) {
        Ari.err();
        Ari.err("You're not in an ari directory!");
        Ari.err('Try running ari init');
        Ari.err();
        process.exit(0);
    }

    Ari.config = require(configPath);

    if (exists(process.cwd() + '/.ari-plugin.json')) {
        Ari.PLUGIN = require(process.cwd() + '/.ari-plugin.json');
    }

    if (exists(process.cwd() + '/.ari-project.json')) {
        Ari.PROJECT = require(process.cwd() + '/.ari-project.json');
    }


    if ((Ari.PLUGIN || Ari.PROJECT) && Ari.args[0] === 'root') {
        Ari.args.shift();
    } else if (Ari.PROJECT || Ari.PLUGIN) {
        Ari.args.unshift(Ari[Ari.PROJECT ? 'PROJECT' : 'PLUGIN'].name);
        Ari.args.unshift(Ari.PROJECT ? 'project' : 'plugin');
    }

    return Ari

})()
