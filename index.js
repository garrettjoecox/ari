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

var instances = {
    project:{},
    plugin:{}
};

process.ARI = {
    config: require('./lib/config/getConfig')
};

var Ari = function(options){
    EventEmitter.call(this);
    this.type = options[type]
    this[options.type] = options;
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

Ari.prototype.changed = function(opts){
    this.emit(this.type + '_changed', {context:this, opts:opts})
};


Ari.prototype.watch = function(plugins, files) {

    plugins.forEach(function(pl, key){
        if (this.config[key]) {

        }
    }.bind(this));

}


Object.defineProperty(Ari.prototype, 'config', {
    get: function(){
        return process.ARI.config;
    }
});

var Plugin = function(options){
    this.type = 'plugin'
    this.name = options.name;
    this.root = options.path;
    this.pkg  = require(this.path + '/package.json');
    this.jspmHook = 'github:' + process.ARI.config.name + '/' + name + '@' + this.pkg.version;
    this.paths = exists(this.path + '/build/paths.js') ? require(this.root + '/build/paths.js') : {};
    this.gulpFile  = require(this.root + '/gulpfile');
    this.gulp  = require(this.root + '/node_moduls/gulpfile');
    return this;
};

var Project = function(options){
    this.type = 'project'
    this.name = options.name;
    this.root = options.path;
    this.pkg  = require(this.root + '/package.json');
    this.paths = exists(this.root + '/build/paths.js') ? require(this.root + '/build/paths.js') : {};
    this.gulpFile  = require(this.root + '/gulpfile');
    this.gulp  = require(this.root + '/node_moduls/gulpfile');
    return this;
};

module.exports = (function(){

    return {
        Project: function(name){
            name = name || path.basename(process.cwd());
            if (!instances.project[name]) {
                instances.project[name] = new Ari(new Project({
                    name: name,
                    path: process.cwd()
                }));
            }
            return instances.project[name];
        },
        Plugin: function(name){
            name = name || path.basename(process.cwd());
            if (!instances.plugin[name]) {
                instances.plugin[name] = new Ari(new Plugin({
                    name: name,
                    path: process.cwd()
                }));
            }
            return instances.plugin[name];
        }
    }
})();







