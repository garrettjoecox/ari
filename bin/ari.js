#!/usr/bin/env node

/*
 * ari
 * https://github.com/e768835/bb
 *
 * Copyright (c) 2015,
 * Licensed under the MIT license.
 */
'use strict'

    var
        fs
      , isConfig
      , commands
      , command
      , config
      , configFile
      , isEmpty
      , configPath     = process.cwd() + '/.ari-config.json'
      , args           = process.argv.slice(2)
      , cmd            = args[0]
      , log            = console.log
      , color          = require('colors')



    if (!cmd) {
        use('help');
    }

    fs             = require('fs')
    isConfig       = fs.existsSync(configPath)
    config         = {}

    if (!isConfig) {

        log('Config not found'.red);
        log('Please run ari init'.blue);
        process.exit(0);
    }

    configFile = fs.readFileSync(configPath);

    isEmpty = !!(configFile.length);

    if (!isEmpty) {
        log('Config file is Empty'.red);
        log('Please run ari init'.red);
        process.exit(0);
    }

    log('Config is not Empty'.green)

    config = JSON.parse(configFile);


    commands = {
          help   : use('help')
        , add    : use('add')
        , delete : use('delete')
        , del    : use('delete')
        , project: use('project')
        // , hold   : use('hold')
    };

    /*
        Prefix args if the command is a current running project.
        This way we don't have to have separate configurations for two different commands.
     */
    if (config.projects[cmd]) {
        args.unshift('project');
        cmd = args[0];
        log('Project '.green+args[1]+' found as command'.green)
    }

    /*
        arg 1 must exist in commands

     */
    if (!commands[cmd]) {
        log(color.red('Command '+cmd +' Does not exist!'));
        cmd = 'help';
        process.exit(0);
    }

    /*
        If the command was ari [my-project, add, class]
        then reformat the args [project, my-project, add, class]
    */

    log(color.green('Command ' + cmd + ' found'))

    config.projects = config.projects || {}
    config.plugins  = config.plugins || {}

    command = commands[cmd]();
    command.config     = config;
    command.configPath = configPath;
    command.args   = args;
    command.run();

    function lib(){
        return function(){
            return require('../lib/'+file+'.js');
        }
    }

    function use(file){
        return function(){
            return require('../cmd/'+file);
        }
    }

// 1800-743-5000
