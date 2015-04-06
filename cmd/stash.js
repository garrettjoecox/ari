
var Ari = process.ARI;
var name = Ari.args[2];
var gulp = require('gulp');
var selector = Ari.args[1];
var pselector = selector + 's';
var moment = require('moment');
var write = require('fs-utils').writeJSON;
var types = { project:true, plugin:true };

module.exports = function(){

    if (Ari.args.length < 3){
        Ari.err();
        Ari.err('Please provide a type and a name!');
        Ari.err('$ ari stash [project/plugin] [name]');
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

    var origin = Ari.config.root + Ari.config[pselector][name].path + '/**/*';
    var time = moment().format('MMM-DD-YY-h-mm-ss-a');
    var dest = Ari.config.paths.holding + Ari.config[pselector][name].path + '/';
    var stashName = name + '-' + time;

    gulp.src(origin)
        .pipe(gulp.dest(Ari.config.root + dest + stashName))
        .on('end', function(err){
            Ari.config.holding[pselector] = Ari.config.holding[pselector] || {};
            Ari.config.holding[pselector][name] = Ari.config.holding[pselector][name] || [];
            Ari.config.holding[pselector][name].push(stashName);
            write(Ari.config.path, Ari.config, function(err){
                if (err){
                    Ari.err();
                    Ari.err('There was an issue stashing the ${a} ${b}', selector, name);
                    Ari.err();
                } else {
                    Ari.ok();
                    Ari.ok('Stashed the ${a} ${b} at ${c}', selector, name, dest + stashName);
                    Ari.ok();
                }
            });
        });
};
