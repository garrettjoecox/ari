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
            , default : true
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
            , filter  : function(value) {
                value = value.split(':')
                return collect(value, function(item){
                    return item.split(',')
                })
              }
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
        return value.trim().split(',')
    }

    function isAttrOrElement() {
        return (target === 'element' || target === 'attribute')
    }
}










