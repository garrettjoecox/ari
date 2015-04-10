
module.exports = function(){
    var Ari    = process.ARI,
        config = Ari.config,
        args   = Ari.args,
        what   = args[1];

    if (!config[what]) {
        Ari.err()
        Ari.err('Please use ari show plugins or projects');
        Ari.err()
        process.exit(0);
    }

    Ari.log()
    for (var key in config[what]) {
        Ari.log(config[what][key].name)
    }
    Ari.log()
}
