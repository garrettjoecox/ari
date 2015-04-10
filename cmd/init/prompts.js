
var Ari = process.ARI;

module.exports = [
    {
        type : 'input',
        name : 'name',
        message : 'Name?',
        default : Ari.config.name || require('path').basename(process.cwd())
    }
];
