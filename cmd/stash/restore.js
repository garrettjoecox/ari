
var Ari = process.ARI;
var fs = require('fs');
var name = Ari.args[3];
var gulp = require('gulp');
var selector = Ari.args[2];
var pselector = selector + 's';
var ask = require('inquirer').prompt;

module.exports = function(){

    var origin = Ari.config.root + Ari.config.paths.holding + '/' + pselector + '/' + name;
    fs.readdir(origin, function(err, data){
        if (err){
            Ari.err();
            Ari.err('The ${a} ${b} has nothing in the stash!', selector, name);
            Ari.err();
            process.exit(0);
        }

        ask({type:'list',name:'backup',message:'Which would you like to restore?',choices:data}, restore);
        function restore(answers){
            var dest = Ari.config.root + '/' + pselector + '/_' + name;
            if (Ari.args[4] === 'force' || Ari.args[4] === 'overwrite') dest = Ari.config.root + '/' + pselector + '/' + name;
            gulp.src(origin + '/' + answers.backup + '/**/*')
                .pipe(gulp.dest(dest))
                .on('end', function(err){
                    if (err){
                        Ari.err();
                        Ari.err('There was an issue restoring the backup for ${a} ', name);
                        Ari.err();
                        process.exit(0);
                    }
                    Ari.ok();
                    Ari.ok('The backup for ${a} has been restored', name);
                    Ari.ok();
                    process.exit(0);
                });
        }
    });
};
