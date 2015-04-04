var basename = require('path').basename

module.exports = (function(){

    var config = process.ARI.config

    return [
        {
              type : 'input'
            , name : 'name'
            , message : 'Name?'
            , default : config.name || basename(process.cwd())
        }
    ];
})()
