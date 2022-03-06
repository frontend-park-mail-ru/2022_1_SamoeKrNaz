(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['error'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"auth__block_error\">\r\n    <svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n        <path d=\"M12.5 0C19.1274 0 24.5 5.37258 24.5 12C24.5 18.6274 19.1274 24 12.5 24C5.87258 24 0.5 18.6274 0.5 12C0.5 5.37258 5.87258 0 12.5 0ZM12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2ZM12.5 15.6C13.2732 15.6 13.9 16.2268 13.9 17C13.9 17.7732 13.2732 18.4 12.5 18.4C11.7268 18.4 11.1 17.7732 11.1 17C11.1 16.2268 11.7268 15.6 12.5 15.6ZM12.5736 6C12.8112 6 12.9604 6.03713 13.0907 6.10685C13.2211 6.17658 13.3234 6.27889 13.3931 6.40926C13.4629 6.53963 13.5 6.68878 13.5 6.92638V13.0736C13.5 13.3112 13.4629 13.4604 13.3931 13.5907C13.3234 13.7211 13.2211 13.8234 13.0907 13.8931C12.9604 13.9629 12.8112 14 12.5736 14H12.4264C12.1888 14 12.0396 13.9629 11.9093 13.8931C11.7789 13.8234 11.6766 13.7211 11.6069 13.5907C11.5371 13.4604 11.5 13.3112 11.5 13.0736V6.92638C11.5 6.68878 11.5371 6.53963 11.6069 6.40926C11.6766 6.27889 11.7789 6.17658 11.9093 6.10685C12.0396 6.03713 12.1888 6 12.4264 6H12.5736Z\" fill=\"#FF7E7E\"/>\r\n    </svg>\r\n    <span class=\"auth__block_error_text\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"errorText") || (depth0 != null ? lookupProperty(depth0,"errorText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"errorText","hash":{},"data":data,"loc":{"start":{"line":5,"column":41},"end":{"line":5,"column":54}}}) : helper)))
    + "</span>\r\n</div>";
},"useData":true});
})();