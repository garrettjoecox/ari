var path = require('path');

var LIB = module.exports = (function(){
    return function(moduleName) {
        return require(path.join(__dirname, moduleName))
    }
})()

