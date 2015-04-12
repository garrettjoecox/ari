#!/usr/bin/env node

var logger = require('../lib/logger');
var path   = require('path');

// Declares Ari object and attaches logger and arguments
process.ARI = {
    root : path.join.bind(path, __dirname, '../'),
    args : process.argv.slice(2),
    log  : logger.log,
    err  : logger.err,
    ok   : logger.ok,
};
var Ari = process.ARI;

// Declares possible commands and their locations
var commands = {
    project : '../cmd/project' ,
    restore : '../cmd/restore' ,
    plugin  : '../cmd/plugin'  ,
    delete  : '../cmd/delete'  ,
    stash   : '../cmd/stash'   ,
    del     : '../cmd/delete'  ,
    help    : '../cmd/help'    ,
    init    : '../cmd/init'    ,
    link    : '../cmd/link'    ,
    add     : '../cmd/add'     ,
    show    : '../cmd/show'    ,
};

// If there are no arguments run help
if (!Ari.args.length) require(commands.help)();

// If the command is init run it;
if (Ari.args[0] === 'init') require(commands.init)();

else {
    // Check if you're in an ari directory and attach config to process.Ari
    Ari = require('../cmd/directoryValidate');

    console.log(Ari.args)

    // Run the passed in command if it's a valid command
    // If the command passed is the name of a project, unshift 'project' and run it
    if (commands[Ari.args[0]]) {
        require(commands[Ari.args[0]])();
    } else if (Ari.config.projects[Ari.args[0]]) {
        Ari.args.unshift('project');
        require(commands.project)();
    } else {
        Ari.err();
        Ari.err('Invalid command');
        Ari.err();
    }
}
