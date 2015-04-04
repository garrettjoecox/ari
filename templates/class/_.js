<% _.forEach(imports, function(item){ %>import {<%=item.name%>} from '<%= item.from %>'
<%})%>

<% if(exporting){ %>export<% } %> class <%=_.capitalize(_.camelCase(name)) %><% if(inherits){ %> extends <%= inherits %><%}%>{

    <% _.forEach(getters, function(item){ %>
    get <%= item %>(){}
    <%})%>
    <% _.forEach(setters, function(item){ %>
    set <%= item %>(){}
    <%})%>

    constructor(<%= params %>){

    }

    <% _.forEach(prototypes, function(item){ %>
    <%= item %>(){}
    <%})%>
}
