(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['headTitle'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"auth__block_header\">\r\n    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"Text") || (depth0 != null ? lookupProperty(depth0,"Text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"Text","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":12}}}) : helper)))
    + " <span class=\"auth__block_header_blue\">Plan</span>exa\r\n</div>";
},"useData":true});
})();