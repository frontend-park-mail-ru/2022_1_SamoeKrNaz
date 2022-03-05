(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['input'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<input class=\"auth__block_input\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"Placeholder") || (depth0 != null ? lookupProperty(depth0,"Placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Placeholder","hash":{},"data":data,"loc":{"start":{"line":1,"column":46},"end":{"line":1,"column":61}}}) : helper)))
    + "\" type=\"text\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"Id") || (depth0 != null ? lookupProperty(depth0,"Id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data,"loc":{"start":{"line":1,"column":79},"end":{"line":1,"column":85}}}) : helper)))
    + "\">";
},"useData":true});
})();