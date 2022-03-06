(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['descp'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"auth__block_descp\">\r\n    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"descpText") || (depth0 != null ? lookupProperty(depth0,"descpText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"descpText","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":17}}}) : helper)))
    + "\r\n</div>\r\n";
},"useData":true});
})();