var events   = require('events');
var gulpGulp = require('gulp-gulp');
var EventEmitter = events.EventEmitter;
var util = require('util');
var path = require('path');
var exists = require('fs').existsSync;
var write  = require('fs-utils').writeJSONSync
var join = path.join;
var gulp   = require(join(process.cwd(), 'node_modules/gulp'));
var config;
var ariInst;
var project;
process.ARI = {}

if (exists(join(process.cwd(), '../', '../', '.ari-config.json'))) {
    config = require(join(process.cwd(), '../', '../', '.ari-config.json'));
    process.ARI.config = config;
} else {
    console.log('Ari Config not found!')
    process.exit(0)
    return;
}

var Ari = function(){
    EventEmitter.call(this);

    var name = path.basename(process.cwd());
    if (!process.ARI.config.projects[name]) {
        console.log('project '+ name + 'does not exist in you config!')
        process.exit(0)
        return;
    }

    this.project  = process.ARI.config.projects[name];
    this.plugins  = this.project.plugins;
    this.jspmPath = config.root + this.project.path + '/jspm_packages/github/'+config.name+'/'
    this._watching = {};
    this.project.output = "/Users/joelcox1/Dev/Libraries/aurelia-interface/projects/"+name+"/jspm_packages/github/"+config.name+"/"
    var projectConfig = {
        project: this.project
    }

    for (var pl in this.plugins) {
        if (this.plugins[pl].watch) {
            this._watching[pl] = process.ARI.config.plugins[pl];
            write(config.root + this._watching[pl].path + '/build/project-config.json', projectConfig);
        }
    }

    gulp.on('task_start', function(e){
        if (e.task === 'watch') {
            for (var pl in this.plugins) {
                if (this.plugins[pl].watch) {
                    this.watchPlugin(this.config.plugins[pl])
                }
            }
        }
    }.bind(this))
};

util.inherits(Ari, EventEmitter);

Ari.prototype.watchPlugin = function(plugin) {

    console.log('Starting Watch on plugin -> '+ plugin.name);

    return gulp.src(this.config.root + plugin.path + '/gulpfile.js')
        .pipe(gulpGulp('watch'));
};

Ari.prototype.get = function(target, name){

    var ptarget = target+'s';

    if (!process.ARI.config) {
        console.log('Ari Config not found!')
        process.exit(0)
        return;
    }

    if (!config[ptarget]) {
        console.log(target, 'not found in your config!')
        process.exit(0)
        return;
    }

    if (!config[ptarget][name]) {
        console.log(name, 'is not a '+target+' in your config!');
        process.exit(0)
        return;
    }

    return config[ptarget][name];
};

Ari.prototype.change = function(val){
};


Object.defineProperty(Ari.prototype, 'config', {
    get: function(){
        return process.ARI.config;
    }
})


module.exports = (function(){
    if (!ariInst) {
        ariInst = new Ari();
    }
    return ariInst;
})()
