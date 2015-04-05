
var Ari = process.ARI;
var fs = require('fs');

module.exports = function(){

  if (!fs.existsSync(process.cwd() + '/.ari-config.json')) {
    Ari.err();
    Ari.err("You're not in an ari directory!");
    Ari.err('Try running ari init');
    Ari.err();
    process.exit(0);
  }

  Ari.config = require(process.cwd() + '/.ari-config.json');

};
