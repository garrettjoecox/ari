(function() {
  'use strict';
  var path     = require('path')
  var _f       = require('fs-utils');
  var fs       = require('fs');
  var _        = require('lodash');

  /**
   * directory builder
   * @description            Create a json file for all your paths
   * @return {Object}        return the paths object
   */
  module.exports = function() {

    // var paths = { root  : join()
    //             , app   : { client : { base:    {root: '', all : '**/*'}
    //                                  , options: {root: '', all : '**/*'}
    //                                  }
    //                       , server : {base: {root: '', all: '**/*'} }
    //                       , static : {base: {root: '', all: '**/*'} }
    //                       }
    //             , client: { config     : {base: {root:'', all:'**/*'}}
    //                       , controller : {base: {root:'', all:'**/*'}}
    //                       , directive  : {base: {root:'', all:'**/*'}}
    //                       , factory    : {base: {root:'', all:'**/*'}}
    //                       , filter     : {base: {root:'', all:'**/*'}}
    //                       , module     : {base: {root:'', all:'**/*'}}
    //                       , route      : {base: {root:'', all:'**/*'}}
    //                       , service    : {base: {root:'', all:'**/*'}}
    //                       , test       : {base: {root:'', all:'**/*'}}
    //                       , view       : {base: {root:'', all:'**/*'}}
    //                       }
    //             }



    // fs.writeJSONSync(join('paths.json'), paths);

    function makeDir(dir, name, obj, isOption) {

      var rootDir = fs.readdirSync(dir);

      _.each(rootDir, function (child, key){
        if(child === '.DS_Store') return;
        var thisDir = dir + '/' + child;
        if(_f.isDir( thisDir ) && child !== 'base' && child !== 'options' && !isOption) {
          obj[child] = {};
          obj[child] = makeDir(thisDir, child, obj[child]);
        } else if(child === 'options') {
          obj[child] = {};
          obj[child].options = {};
          obj[child] = makeDir(thisDir, child, obj[child].options, true);
        } else {
          obj[child] = {}
          obj[child].all  = thisDir + '/**/*';
          obj[child].root = thisDir
        }
      });
      return obj;
    }

    var paths = makeDir(join('templates'), 'templates', {templates:{}});
    _f.writeJSONSync(join('paths.json'), paths)
    return paths;

    function join(){
      var dirs = [__dirname].concat(Array.prototype.slice.call(arguments));
      return path.join.apply(path.join, dirs);
    }
  };

})()