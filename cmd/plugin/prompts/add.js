/*
 *  @prompts   ADD
 *
 *  @action    ADD
 *  @command   PROJECT
 */
'use strict'


var collect = require('lodash/collection/collect')

module.exports = function(target) {
    return [
        {
              type : 'confirm'
            , name : 'appendName'
            , message : 'Append the function name?'
            , default : true
            , when    : isAttrOrElement
        },{
              type : 'confirm'
            , name : 'newDir'
            , message : 'Create a new Directory?'
            , default : false
        },{
              type : 'confirm'
            , name : 'exporting'
            , message : 'Export from file?'
            , default : true
        },{
              type : 'input'
            , name : 'imports'
            , message : 'import? <name:from>'
            , filter:function(value){
                var arr = value.split(',')
                return collect(arr, function(item){
                    var val = item.split(':')
                    return {name:val[0], from:val[1]}
                });
            }
        },{
              type : 'confirm'
            , name : 'isView'
            , message : 'View?'
            , default : false
            , when    : isAttrOrElement
        },{
              type : 'input'
            , name : 'inherits'
            , message : 'Inherits?'
        },{
              type : 'input'
            , name : 'inject'
            , message : 'inject?'
            , filter  : list
        },{
              type : 'input'
            , name : 'metadata'
            , message : 'metadata/Behavior properties?'
            , when    : isAttrOrElement
            , filter  : list
        },{
              type : 'input'
            , name : 'getters'
            , message : 'Getters?'
            , filter  : list
        },{
              type : 'input'
            , name : 'setters'
            , message : 'Setters?'
            , filter  : list
        },{
              type : 'input'
            , name : 'prototypes'
            , message : 'Prototypes?'
            , filter  : list
        }
    ];


    function list(value) {
        var arr = [];
        value.split(',').forEach(function(item, index){
            if (item) arr.push(item)
        })
        return arr
    }

    function isAttrOrElement() {
        return (target === 'element' || target === 'attribute')
    }
}










