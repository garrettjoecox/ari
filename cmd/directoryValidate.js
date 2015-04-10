
var Ari = process.ARI;
var fs = require('fs');

module.exports = function(){

    var fileName = '/.ari-config.json';
    var configPath = process.cwd().split('/');
    var notFound   = true;

    while(!fs.existsSync(configPath.join('/') + fileName)) {
        configPath.pop();
    }

    configPath = configPath.join('/') + fileName;

    if (!fs.existsSync(configPath)) {
        Ari.err();
        Ari.err("You're not in an ari directory!");
        Ari.err('Try running ari init');
        Ari.err();
        process.exit(0);
    }

    Ari.config = require(configPath);

};
