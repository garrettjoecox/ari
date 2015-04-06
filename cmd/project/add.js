/*
 *  @action    ADD
 *
 *  @command   PROJECT
 */

'use strict'

/*
 *  Dependencies
 */
var path = require('path')
    , prompts      = require('./prompts/add')
;
module.exports = function(config, project, action, target, name){

    var dest      = path.join(config.root, (project.path || '/projects/'+project.name), 'src', name),
        generate = require(process.ARI.root('lib','generators', target))
    ;

    generate({
      name     : name     ,
      dest     : dest     ,
      prompts  : prompts  ,
      target   : target  ,
      selector : 'project',
    })

}
