
var template = require('lodash/string/template');

Object.defineProperties(String.prototype, {
  magenta: { get: function(){ return '\x1B[35m' + this.valueOf() + '\x1B[39m'; } },
  yellow: { get: function(){ return '\x1B[33m' + this.valueOf() + '\x1B[39m'; } },
  white: { get: function(){ return '\x1B[37m' + this.valueOf() + '\x1B[39m'; } },
  black: { get: function(){ return '\x1B[30m' + this.valueOf() + '\x1B[39m'; } },
  green: { get: function(){ return '\x1B[32m' + this.valueOf() + '\x1B[39m'; } },
  grey: { get: function(){ return '\x1B[90m' + this.valueOf() + '\x1B[39m'; } },
  blue: { get: function(){ return '\x1B[34m' + this.valueOf() + '\x1B[39m'; } },
  cyan: { get: function(){ return '\x1B[36m' + this.valueOf() + '\x1B[39m'; } },
  red: { get: function(){ return '\x1B[31m' + this.valueOf() + '\x1B[39m'; } },
});

var ai = '['.blue + 'ari'.magenta + ']'.blue;
var colon = ':'.blue;
var error = '[ '.blue + 'Error '.red + ']'.blue;
var success = '['.blue + 'Success'.green + ']'.blue;

exports.log = function(string, a, b, c, d){
  if (!string){ console.log(''); return; }
  console.log(ai + colon, template(string)({ a:a, b:b, c:c, d:d }));

};

module.exports.ok = function(string, a, b, c, d){
  if (!string){ console.log(''); return; }
  console.log(ai, success + colon, template(string)({ a:a, b:b, c:c, d:d }).green);
};

module.exports.err = function(string, a, b, c, d){
  if (!string){ console.log(''); return; }
  console.log(ai, error + colon, template(string)({ a:a, b:b, c:c, d:d }).red);
};


var main = require.main;
// console.log(main.require('../lib')('config/getConfig'))
