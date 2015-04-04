/*
 *  @settings  ADD
 *
 *  @action    ADD
 *  @command   PROJECT
 */
'use strict'

var extend = require('lodash/object/extend')
  , kebabCase  = require('lodash/string/kebabCase')
  , capitalize = require('lodash/string/capitalize')
  , camelCase = require('lodash/string/camelCase')
;

var defaults = {

      name       : ''
    , imports    : []
    , exporting  : true
    , inherits   : false
    , getters    : []
    , setters    : []
    , prototypes : []
    , params     : []
}

var filters = {

    class   : defaults,
    element : {
          imports    : [{name:'Behavior', from:'aurelia-templating'}]
        , metadata   : []
        , inject     : ['Element']
        , params     : ['element']
        , view       : true
    },
    attribute : {
          imports    : [{name:'Behavior', from:'aurelia-templating'}]
        , metadata   : []
        , inject     : ['Element']
        , params     : ['element']
        , view       : false
    },
    resource : {
        index: true
    }
}

var globs = {

  class: {
      all: '**/*'
  },
  element : {
      model: '/model/*'
    , view : '/view/*'
    , all  : '/**/*'
  }
}
module.exports = function(target, name){
    return {
          filter  : extend(defaults, filters[target])
        , glob    : globs[target]
        , names   : { kebab:kebabCase(name), class:capitalize(camelCase(name)) }
    }
}
