/*
 * ari
 * https://github.com/joelcoxokc/ari
 *
 * Copyright (c) 2015, JoelCox
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var Api = require('../lib/ari.js');
var api = new Api('access_token');

describe('ari module', function() {
    describe('#constructor()', function() {
        it('should be a function', function() {
            Api.should.be.a("function");
        });
    });
    describe('#instance()', function() {
        it('should be a object', function() {
            api.should.be.a("object");
        });
    });
});

