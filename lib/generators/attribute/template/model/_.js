<% _.forEach(imports, function(item){ %><% if(item.name){ %>import {<%=item.name%>} from '<%= item.from %>'<% } %>
<%})%>
<% if(exporting){ %>export<% } %> class <%=_.capitalize(_.camelCase(name)) %><% if(inherits){ %> extends <%= inherits %><%}%>{
    <% if (metadata.length){ %>
    static metadata(){
        return Behavior
            .withOptions().and((x)=>{<% _.forEach(metadata, function(item){ %>
                x.withProperty(<%= item %>)<%})%>
            })<% if (!view){ %>
            .noView()<% } %>
    }<% } %>

    static inject(){
        return [<%= inject %>]
    }
    <% if(getters.length){ %><% _.forEach(getters, function(item){ %>
    get <%= item %>(){}
    <%})%><% } %>
    <% if(setters.length){ %><% _.forEach(setters, function(item){ %>
    set <%= item %>(){}
    <%})%><% } %>

    constructor(<%= params %>){

    }

    <% if(metadata.length){ %><% _.forEach(metadata, function(item){ %>
    <%= item[0] %>Changed(){}
    <%})%><% } %>

    <% if(prototypes.length){ %><% _.forEach(prototypes, function(item){ %>
    <%= item %>(){}
    <%})%><% } %>
}
