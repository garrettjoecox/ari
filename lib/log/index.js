var
/*
    Dependencies
 */
      _       = require('lodash')
    , color   = require('colors')
    , temp    = _.template('${a}${b}${c}${d}')
    , wrap    = function(a,b,c,d){return temp({a:a,b:b,c:c,d:d})}


LOG = module.exports = (function(){
    var
    /*
        Locals
     */
          collan   =  color.magenta(': ')
        , AI       =  '['.blue + 'ai'.bold.magenta + ']'.blue
    ;

    return {
          Err : Err
        , Ok  : Ok
        , Pre : Pre
    }


    function Err(){

        var error = '[', 'Error'.red, ']' + collan + ' ';
        return function(msg){
            var template = _.template(msg)
            return AI + ' ' + error + ' '
        }
    }

    function Ok(){
        var ok = wrap('[', 'Ok'.red, ']', collan);
        return function(msg, one, two, three, four){
            var template = _.template(msg)
            return wrap(AI, ok, temp({one:one,two:two,three:three,four:four}))()
        }
    }

    function Pre(){
        return function(msg, one, two, three, four){
            var template = _.template(msg)
            return wrap(AI, collan, temp({one:one,two:two,three:three,four:four}))
        }
    }

})()



