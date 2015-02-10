/*
 * mvvm
 * https://github.com/joelcoxokc/mvvm
 *
 * Copyright (c) 2015,
 * Licensed under the MIT license.
 */

'use strict';

/*
 * Module Dependencies
 */

var inquirer = require('inquirer');
var program  = require('commander');
var request  = require('superagent');
var debug    = require('./debugger.js');
var join     = require('path').join;
var gulp     = require('gulp');
var pj       = require('prettyjson').render;
var _        = require('lodash');
var $        = require('gulp-load-plugins')({lazy:false})

require('./paths.builder.js')();

/**
 * @class Api
 *
 * @constructor
 *
 * Constructor responsible for provide api requests
 *
 * @example
 *
 *     var api = new Api('access_token');
 *
 * @param {String} access_token Access Token
 */

var Api = module.exports = function Api(token) {

    this.root = join(__dirname)
    this.templates = require('./paths.json');


    this.validateName = function() {
        if(!program.args[0]) {
            this.error('Please include a name');
            return false;
        }
        return true;
    };
    this.error = function(message) {
        console.log(message.bold.red)
    }
    //Post handler
    this.post = function(path, body, cb) {
    };
    //Put handler
    this.put = function(path, body, cb) {
    };
    //Delete handler
    this.delete = function(path, body, cb) {
    };
};

//HandlerExceptions
process.on('uncaughtException', function(err) {
    console.log();
    console.error(err.stack);
    console.error(err);
});

/**
 * Method responsible for asking questions
 *
 * @example
 *
 *     api.prompt(prompts, cb);
 *
 * @method prompt
 * @public
 * @param {Object} prompts Array of prompt options
 * @param {Function} cb A callback
 */

Api.prototype.prompt = function prompt(prompts, cb) {
    inquirer.prompt(prompts, function(answers) {
        cb(answers);
    });
};

Api.prototype.start = function(cb){
    gulp.task('default', cb).start();
};

Api.prototype.task = function(name, source, dest, filters) {
    return function() {
        return gulp.src(source)
                .pipe($.template(filters))
                .pipe($.rename(renameFile(name)))
                .pipe($.conflict(dest))
                .pipe(gulp.dest(dest));
    }
}

/**
 * Method responsible for creating Aurelia app components
 *
 * @example
 *
 *     api.app();
 *
 * @method app
 * @public
 */
Api.prototype.app = function app() {

    this.start($.shell.task([
               'git clone http://github.com/aurelia/skeleton-navigation'
        ]));
};


/*
 * Method responsible for creating Aurelia config components
 *
 * @example
 *
 *     api.config();
 *
 * @method config
 * @public
 */
Api.prototype.config = function config() {
    if(!this.validateName) return;

    var filters = {
        name     : program.args[0],
        module   : program.module || 'app',
        providers: program.providers || [],
    }
    var source = this.templates.client.config.base.all;
    this.start(
        this.task(
            filters.name,
            source,
            process.cwd(),
            filters
        )
    );
};

/**
 * Method responsible for creating Aurelia controller components
 *
 * @example
 *
 *     api.controller();
 *
 * @method controller
 * @public
 */
Api.prototype.controller = function controller() {
    var name,names,source,dest,filters;
    if(!this.validateName) return;

    name  = program.args[0];

    names = {classed: _.capitalize(name) }

    var filters = {
        name     : program.args[0],
        module   : program.module || 'app',
        providers: program.providers || [],
        functions: program.functions || [],
    }
    var source = this.templates.client.config.base.all;
    this.start(
        this.task(
            filters.name,
            source,
            process.cwd(),
            filters
        )
    );
};

/**
 * Method responsible for creating Aurelia directive components
 *
 * @example
 *
 *     api.directive();
 *
 * @method directive
 * @public
 */
Api.prototype.directive = function directive() {
    var name, names, filters, type, source, dest;

    if(!this.validateName) return;
    if(program.comples && program.simple) return this.error('Please only choose on of [--complex or --simple]');

    program.complex &&( type = 'complex' );
    program.simple  &&( type = 'simple'  );

    name  = program.args[0];
    names = { camel: _.camelCase(name)
            , kebab: _.kebabCase(name)
            };
    filters={ name     : program.args[0]
            , names    : names
            , module   : program.module    || names.camel
            , providers: program.providers || []
            , functions: program.functions || []
            , hasModule: !!program.module
            };

    source = this.templates.client.directive.options[type].all;
    dest   = process.cwd() +'/directives/' + filters.names.kebab;
    this.start(
        this.task( filters.names.kebab
                 , source
                 , dest
                 , filters
                 )
    );
};

/**
 * Method responsible for creating Aurelia factory components
 *
 * @example
 *
 *     api.factory();
 *
 * @method factory
 * @public
 */
Api.prototype.factory = function factory() {};

/**
 * Method responsible for creating Aurelia filter components
 *
 * @example
 *
 *     api.filter();
 *
 * @method filter
 * @public
 */
Api.prototype.filter = function filter() {};

/**
 * Method responsible for creating Aurelia module components
 *
 * @example
 *
 *     api.module();
 *
 * @method module
 * @public
 */
Api.prototype.module = function module() {};

/**
 * Method responsible for creating Aurelia filter components
 *
 * @example
 *
 *     api.filter();
 *
 * @method filter
 * @public
 */
Api.prototype.filter = function filter() {};

/**
 * Method responsible for creating Aurelia module components
 *
 * @example
 *
 *     api.module();
 *
 * @method module
 * @public
 */
Api.prototype.module = function module() {};

/**
 * Method responsible for creating Aurelia route components
 *
 * @example
 *
 *     api.route();
 *
 * @method route
 * @public
 */
Api.prototype.route = function route() {};


/**
 * Method responsible for creating Aurelia service components
 *
 * @example
 *
 *     api.service();
 *
 * @method service
 * @public
 */
Api.prototype.service = function service() {
    if(!this.validateName) return;

    var name = program.args[0];
    var names = {
        classed: _.startCase(name)
    };
    var filters = {
        name     : name,
        names    : names,
        module   : program.module || 'app',
        providers: program.providers || [],
        functions: program.functions || [],
    }
    var source = this.templates.client.service.base.all;
    this.start(
        this.task(
            filters.name,
            source,
            process.cwd(),
            filters
        )
    );
};


/**
 * Method responsible for creating Aurelia test components
 *
 * @example
 *
 *     api.test();
 *
 * @method test
 * @public
 */
Api.prototype.test = function test() {};


/**
 * Method responsible for creating Aurelia view components
 *
 * @example
 *
 *     api.view();
 *
 * @method view
 * @public
 */
Api.prototype.view = function view() {};





/**
 * Method responsible for showing the status of api
 *
 * @example
 *
 *     api.status();
 *
 * @method status
 * @public
 * @param {Boolean} pureJson If true show json raw
 */

Api.prototype.status = function status(pureJson) {
    this.get('status', function(err, res) {
        if (err) {
            return response(err);
        }
        return response(null, res, pureJson);
    });
};


function renameFile(name){
    return function (file){
        if (file.basename[0] === '_') {
          file.basename = name + file.basename.slice(1);
        }
    }
}
