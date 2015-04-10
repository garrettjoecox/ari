
var Ari = process.ARI;
var name = Ari.args[3];
var gulp = require('gulp');
var selector = Ari.args[2];
var pselector = selector + 's';

module.exports = function(){

    var origin = Ari.config.root + Ari.config[pselector][name].path + '/**/*';
    var time = require('moment')().format('MMM-DD-YY-h-mm-ss-a');
    var dest = Ari.config.paths.holding + Ari.config[pselector][name].path + '/';
    var stashName = Ari.args[4] || name + '-' + time;

    gulp.src(origin)
        .pipe(gulp.dest(Ari.config.root + dest + stashName))
        .on('end', function(err){
            if (err){
                Ari.err();
                Ari.err('There was an issue stashing the ${a} ${b}', selector, name);
                Ari.err();
                process.exit(0);
            }
            Ari.ok();
            Ari.ok('Stashed the ${a} ${b} at ${c}', selector, name, dest + stashName);
            Ari.ok();
            process.exit(0);
        });
};
