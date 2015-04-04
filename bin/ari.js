#!/usr/bin/env node

// Slice arguments into an array
process.ARI = {};
var args = process.argv.slice(2);

// If there are no arguments run help
if (!args.length){
    require('../cmd/help')();
    return;
}

var fs = require('fs');
var Err = require('../lib/logger').Err;
var configPath = process.cwd() + '/.ari-config.json';

// Checks for configuration file
if (!fs.existsSync(configPath)){
    Err('Config not found');
    Err('Please run ari init');
    return;
}

var config = fs.readFileSync(configPath);

// Checks if config is empty for some reason?
if (!config.length){
    Err('Config file is empty');
    Err('Please run ari init');
    return;
}

// Parses config for use
config = JSON.parse(config);
var commands = {
    init: true,
    help: true,
    add: true,
    del: true,
    delete: true,
    project: true,
}

// If first argument is the name of a project in the config, add 'project' to the front of the args array
if (config.projects[args[0]]) args.unshift('project');

process.ARI.args = args;
process.ARI.config = config;
process.ARI.configPath = configPath;

// If the command exists require that file and run it
if (commands[args[0]]) require('../cmd/' + args[0])();
// Else run help
else {
    require('../cmd/help')();
    Err('Command not found');
    return;
}
