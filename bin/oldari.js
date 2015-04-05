#!/usr/bin/env node

/* Main 'ari' routing command */

var args = process.argv.slice(2);

if (!args.length){
    require('../cmd/help')();
    return;
}

var fs = require('fs');
var Err = require('../lib/logger').Err;
var configPath = process.cwd() + '/.ari-config.json';

if (!fs.existsSync(configPath)){
    Err('Config not found');
    Err('Please run ari init');
    return;
}

var config = fs.readFileSync(configPath);

if (!config.length){
    Err('Config file is empty');
    Err('Please run ari init');
    return;
}

config = JSON.parse(config);
var commands = {
    init:    'init',
    help:    'help',
    link:    'link',
    add:     'add',
    del:     'delete',
    delete:  'delete',
    project: 'project',
}

config.projects = config.projects || {};
if (config.projects[args[0]]) args.unshift('project');

process.ARI = {};
process.ARI.args = args;
process.ARI.config = config;
process.ARI.configPath = configPath;

if (commands[args[0]]) require('../cmd/' + commands[args[0]])();
else {
    require('../cmd/help')();
    Err('Command not found');
    return;
}
