#!/usr/bin/env node

var logger = require('../lib/logger');

// Declares Ari object and attaches logger and arguments
process.ARI = {
  args: process.argv.slice(2),
  err: logger.Err,
  ok: logger.Ok,
  log: logger.Pre
};
var Ari = process.ARI;

// Declares possible commands and their locations
var commands = {
  project: '../cmd/project',
  delete: '../cmd/delete',
  del: '../cmd/delete',
  help: '../cmd/help',
  init: '../cmd/init',
  link: '../cmd/link',
  add: '../cmd/add',
};

// If there are no arguments run help
if (!Ari.args.length) require(commands.help)();

// Check if you're in an ari directory and attach config to process.Ari
require('../cmd/directoryValidate')();

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
