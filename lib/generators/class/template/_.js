<% _.forEach(imports, function(item){ %>import {<%=item.name%>} from '<%= item.from %>'
<%})%>

<% if(exporting){ %>export<% } %> class <%= names.class %><% if(inherits){ %> extends <%= inherits %><%}%>{

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
