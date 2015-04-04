var extend = require('lodash/object/extend')
  , kebabCase  = require('lodash/string/kebabCase')
  , capitalize = require('lodash/string/capitalize')
  , camelCase = require('lodash/string/camelCase')
module.exports = (function(){
    var

    /*
        Exports
     */
      defaults  = {
          name       : ''
        , imports    : []
        , exporting  : true
        , inherits   : false
        , getters    : []
        , setters    : []
        , prototypes : []
        , params     : []
      }
    , filters = {
          class   : defaults
        , element : {
              imports    : [{name:'Behavior', from:'aurelia-templating'}]
            , metadata   : []
            , inject     : ['Element']
            , params     : ['element']
            , view       : true
          }
        , attribute : {
              imports    : [{name:'Behavior', from:'aurelia-templating'}]
            , metadata   : []
            , inject     : ['Element']
            , params     : ['element']
            , view       : false
          }
        , resource : {
            index: true
          }
      }
    , globs = {
          class: {
            all: '**/*'
          }
        , element : {
              model: '/model/*'
            , view : '/view/*'
            , all  : '/**/*'
          }
    }
    return function (target, name) {
      return {
          filter  : extend(defaults, filters[target])
        , glob    : globs[target]
        , names   : {
            kebab : kebabCase(name),
            class : capitalize(camelCase(name))
          }
      };
    };

})()
