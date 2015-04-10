
var Ari = process.ARI;
var project = Ari.args[1];

module.exports = function() {

    if (Ari.args.length < 3){
        Ari.err();
        Ari.err('Please provide a project and a plugin!');
        Ari.err('$ ari link [project] [plugin]');
        Ari.err();
        process.exit(0);
    }

    var project = Ari.config.projects[Ari.args[1]];
    var plugin = Ari.config.plugins[Ari.args[2]];

    if (!project) {
        Ari.err();
        Ari.err('The project ${a} does not exist!', Ari.args[1]);
        Ari.err();
        process.exit(0);
    }

    if (!plugin) {
        Ari.err();
        Ari.err('The plugin ${a} does not exist!', Ari.args[2]);
        Ari.err();
        process.exit(0);
    }

    require('gulp').task('link', require('gulp-shell').task([
        'cd plugins/' + plugin.name + ' && jspm link -y github:' + Ari.config.name + '/' + plugin.name + '@master',
        'cd projects/' + project.name + ' && jspm install -l github:' + Ari.config.name + '/' + plugin.name + '@master'
    ])).start(function(err){
        if (err){
            Ari.err();
            Ari.err('There was an issue linking the plugin ${a} to ${b}', plugin.name, project.name);
            Ari.err();
            process.exit(0);
        } else {

            Ari.config.projects[project.name].plugins = Ari.config.projects[project.name].plugins || {};
            Ari.config.projects[project.name].plugins[plugin.name] = {watch:true};

            require('fs-utils').writeJSONSync(Ari.config.path, Ari.config);

            Ari.ok();
            Ari.ok('The plugin ${a} has been linked to ${b}', plugin.name, project.name);
            Ari.ok();
            process.exit(0);
        }
    });
};
