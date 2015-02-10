#!/usr/bin/env node

/*
 * mvvm
 * https://github.com/joelcoxokc/mvvm
 *
 * Copyright (c) 2015,
 * Licensed under the MIT license.
 */

/**
 * Module dependencies.
 */

var notifier = require('update-notifier');
var program  = require('commander');
var Insight  = require('insight');
var config   = require('gulp-storage');
var banner   = require('../lib/banner.js');
var debug    = require('../lib/debugger.js');
var gulp     = require('gulp');
var path     = require('path');
var pkg      = require('../package.json');
var del      = require('del');
var fs       = require('fs');
var _f       = require('fs-utils');
var _        = require('lodash');
var $        = require('gulp-load-plugins')({lazy:false})

var Api      = require('..');
var api      = new Api('access_token');
// var require('gulp')
// var require('gulp')
// var require('gulp')
// var require('gulp')
// var require('gulp')
// var require('gulp')

require('colors');

/*
 * Api Insight
 */

var insight = new Insight({
    trackingCode: 'google-traking-code',
    packageName: pkg.name,
    packageVersion: pkg.version
});

/*
 * Api Bootstrap
 */

program
    .version(pkg.version, '-v, --version')
    .usage('command [option]'.white);

/*
 * Options
 */

program
    .option('--json', 'Show pure JSON output')
    .option('-im, --import <items>', 'A List of imported plugins', list)
    .option('-p, --props   <items>', 'A List of constructor properties', list)
    .option('-m, --methods <items>', 'A List of prototype methods', list)
    .option('--complex', 'Use Complex Component')
    .option('--simple', 'Use Simple Component')

program
    .command('app')
    .action(function(){
        api.app();
    })

program
    .command('config [type]')
    .action(function(){
        api.config();
    })

program
    .command('controller [type]')
    .action(function(){})

program
    .command('directive [name]')
    .action(function(){
        api.directive();
    })

program
    .command('factory [name]')
    .action(function(){
        api.factory();
    })

program
    .command('service [name]')
    .action(function(){
        api.service();
    })

program
    .command('filter [name]')
    .action(function(){
        api.filter();
    });

// program
//     .command('module [name]')
//     .action(function(){
//         api.module();
//     })

program
    .command('route [name]')
    .action(function(){
        api.route();
    })

program
    .command('test [name]')
    .action(function(){
        api.test();
    })

program
    .command('view [name]')
    .action(function(){
        api.view();
    })

/*
 * Api init
 */

program
    .command('init')
    .description('Create your account'.white)
    .action(function() {
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What\'s your name?'
        }, {
            type: 'input',
            name: 'email',
            message: 'What\'s your email?'
        }, {
            type: 'password',
            name: 'password',
            message: 'Enter your password'
        }];
        //Ask
        api.prompt(prompts, function(answers) {
            api.signup(answers.name, answers.email, answers.password);
        });
    });

/*
 * Api Status
 */
program
    .command('status')
    .description('Show status of API'.white)
    .action(function() {
        api.status(program.json);
    });

/*
 * Api on help ption show examples
 */

program.on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ mvvm signup');
    console.log('    $ mvvm status');
    console.log('');
});

/*
 * Api Banner
 */

if (process.argv.length === 3 && process.argv[2] === '--help') {
    banner();
}

if (process.argv.length === 4 && process.argv[3] !== '--json') {
    banner();
} else {
    if (process.argv.length === 3 && process.argv[2] !== '--help') {
        banner();
    }
}


/*
 * Api Process Parser
 */

program.parse(process.argv);

/*
 * Api Default Action
 */

var notifier = notifier({
    packageName: pkg.name,
    packageVersion: pkg.version
});

if (notifier.update) {
    notifier.notify(true);
}

if (process.argv.length == 2) {
    // banner();
    // program.help();
}


function list(val) {
  return val.split(',');
}
