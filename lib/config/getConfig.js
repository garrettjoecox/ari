var exists = require('fs').existsSync

module.exports = (function() {
    var configName, cwd, configPath;

    configName = '/.ari-config.json';
    cwd        = process.cwd().split('/');

    while(!exists(cwd.join('/') + configName) && cwd.length) {
        cwd.pop();
    }

    configPath = cwd.join('/') + configName;

    if (!exists(configPath)) {
        console.log();
        console.log('Error: Config Not found')
        console.log();
        process.exit(0)
    }

    return require(configPath);
})();
