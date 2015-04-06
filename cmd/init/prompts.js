
var Ari = process.ARI;
var basename = require('path').basename;

module.exports = [
    {
        type : 'input',
        name : 'name',
        message : 'Name?',
        default : Ari.config.name || basename(process.cwd())
    }
];
