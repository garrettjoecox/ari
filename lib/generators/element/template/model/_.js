<% if(imports.length){ %><% _.forEach(imports, function(item){ %><% if(item.name){ %>import {<%=item.name%>} from '<%= item.from %>'<% } %>
<%})%><% } %>
<% if(exporting){ %>export<% } %> class <%= names.class %><% if(appendName){ %>CustomElement<% } %><% if(inherits){ %> extends <%= inherits %><%}%>{
    <% if (metadata.length){ %>
    static metadata(){
        return Behavior
            <% _.forEach(metadata, function(item){ %>
            .withProperty(<%= item %>)<%})%><% if(view){ %>
            .noView()<% } %>
    }<% } %>

    static inject(){
        return [<%= inject %>]
    }<% if(getters.length){ %><% _.forEach(getters, function(item){ %>
    get <%= item %>(){}<%})%><% } %>
    <% if(setters.length){ %><% _.forEach(setters, function(item){ %>
    set <%= item %>(){}<%})%><% } %>

    constructor(<%= params %>){

    }<% if(metadata.length){ %><% _.forEach(metadata, function(item){ %>

    <%= item %>Changed(){}<%})%><% } %>
    <% if(prototypes.length){ %><% _.forEach(prototypes, function(item){ %>
    <%= item %>(){}<%})%><% } %>
}
