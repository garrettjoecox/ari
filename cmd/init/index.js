
var Ari = process.ARI;
var configPath = process.cwd() + '/.ari-config.json';

module.exports = function(){

    if (require('fs').existsSync(configPath)) {
        Ari.config = require(configPath);
    } else Ari.config = {};

    require('inquirer').prompt(require('./prompts'), save);

    function save(answers) {

        Ari.config.name = answers.name;
        Ari.config.path = configPath;
        Ari.config.root = process.cwd();
        Ari.config.paths = Ari.config.paths || {holding   : "/.holding", templates : "/templates"};
        Ari.config.projects = Ari.config.projects || {};
        Ari.config.holding = Ari.config.holding || {};
        Ari.config.plugins = Ari.config.plugins || {};
        Ari.config.using = Ari.config.using || {};
        Ari.config.defaults = {
            template :{
                project:"skeleton-navigation",
                plugin :"skeleton-plugin"
            }
        };

        require('fs-utils').writeJSON(configPath, Ari.config, finish);
    }

    function finish(err) {
        if (err) {
            Ari.err();
            Ari.err('There was an error initializing ${a}', Ari.config.name);
            Ari.err();
            process.exit(0);
        }
        Ari.ok();
        Ari.ok('${a} has been initialized', Ari.config.name);
        Ari.ok();
        process.exit();
    }
};
