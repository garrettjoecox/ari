
var Ari = process.ARI;
var name = Ari.args[3];
var selector = Ari.args[2];
var pselector = selector + 's';
var types = { project:true, plugin:true };
var commands = {
  add: './add',
  dump: './dump',
  restore: './restore',
};

module.exports = function(){

  if (Ari.args.length < 4){
    Ari.err();
    Ari.err('Please provide an action, a project and name');
    Ari.err('$ ari stash [add/restore/dump] [name] (alias)');
    Ari.err();
    process.exit(0);
  }

  if (!commands[Ari.args[1]]) {
    Ari.err();
    Ari.err('Please provide a valid action');
    Ari.err('Actions: add / restore / dump');
    Ari.err();
    process.exit(0);
  }

  if (!types[selector]){
      Ari.err();
      Ari.err('Invalid type: ${a}', selector);
      Ari.err('Valid types: project / plugin');
      Ari.err();
      process.exit(0);
  }

  if (!Ari.config[pselector][name]){
      Ari.err();
      Ari.err("The ${a} ${b} doesn't exist!", selector, name);
      Ari.err('Please try again');
      Ari.err();
      process.exit(0);
  }

  require(commands[Ari.args[1]])();

};
