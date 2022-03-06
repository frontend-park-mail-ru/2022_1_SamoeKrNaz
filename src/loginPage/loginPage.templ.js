(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['button'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button class=\"auth__block_button\" type=\"submit\">\r\n    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"buttonText") || (depth0 != null ? lookupProperty(depth0,"buttonText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"buttonText","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":18}}}) : helper)))
    + "\r\n</button>\r\n";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['decoration'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"auth__decoration\">\r\n    <svg width=\"1026\" height=\"1400\" viewBox=\"0 0 1026 1400\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"auth__svg\">\r\n        <path d=\"M1009.14 137.058C734.502 111.991 643.911 87.1974 547.308 31.9837L183.872 35.5933C491.106 119.559 665.497 158.151 985.631 190.98L1009.14 137.058Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M987.368 320.043C740.386 231.111 211.021 252.361 1.89816 147.062L3.95797 300.11C449.469 337.626 664.057 363.668 988.69 418.267L987.368 320.043Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M4.63432 350.364C405.601 417.493 646 438.966 990.657 564.463L992.625 710.658C796.251 611.918 628.66 557.413 440.122 507.301C1031.87 689.91 507.686 919.514 998.789 1168.66L1000.66 1308C233.266 805.574 1036.66 673.842 5.87943 442.878L5.49514 414.325C95.7773 428.416 175.149 442.887 244.938 457.718C170.59 439.272 91.458 419.705 5.26456 397.192L4.63432 350.364Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M697.176 1393.26C328.28 1248.43 454.15 1083.83 13.1656 984.257L13.9957 1045.93C271.162 1119.91 262.93 1279.92 520.65 1395.02L697.176 1393.26Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M15.4406 1153.3C206.566 1207.37 162.675 1290.05 16.5781 1237.81L15.4406 1153.3Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M188.365 1398.32L18.0384 1346.32L18.7609 1400L188.365 1398.32Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M8.36965 627.907C8.36965 627.907 483.181 925.901 556.59 978.86C556.59 978.86 651.359 1040.38 603.474 1105.99C555.588 1171.59 412.322 1111.79 11.8283 884.89L11.2903 844.915C11.2903 844.915 249.073 943.718 265.887 906.998C282.702 870.277 9.18435 688.441 9.18435 688.441L8.36965 627.907Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M989.151 452.532C797.579 434.166 785.071 462.635 989.889 507.355L989.151 452.532Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M984.417 100.75C879.533 111.083 840.334 90.9312 789.6 29.5773L1007.29 0L984.417 100.75Z\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M442.683 702.802C483.514 704.4 409.65 606.787 308.888 579.23C208.126 551.673 184.189 573.615 222.525 592.653C260.86 611.691 401.853 701.205 442.683 702.802Z\" fill=\"#AEDAFC\"/>\r\n        <ellipse cx=\"868.685\" cy=\"391.763\" rx=\"5.41608\" ry=\"6.1851\" transform=\"rotate(90 868.685 391.763)\" fill=\"#AEDAFC\"/>\r\n        <ellipse cx=\"725.545\" cy=\"1227.19\" rx=\"10.3808\" ry=\"12.3702\" transform=\"rotate(90 725.545 1227.19)\" fill=\"#AEDAFC\"/>\r\n        <ellipse cx=\"757.354\" cy=\"1252.92\" rx=\"8.12412\" ry=\"8.83585\" transform=\"rotate(90 757.354 1252.92)\" fill=\"#AEDAFC\"/>\r\n        <ellipse rx=\"15.4473\" ry=\"17.0692\" transform=\"matrix(0.453765 0.891121 -0.935331 0.353773 162.333 558.106)\" fill=\"#AEDAFC\"/>\r\n        <ellipse rx=\"10.2982\" ry=\"11.3795\" transform=\"matrix(0.453765 0.891121 -0.935331 0.353773 125.6 548.287)\" fill=\"#AEDAFC\"/>\r\n        <ellipse rx=\"6.86547\" ry=\"7.58632\" transform=\"matrix(0.453765 0.891121 -0.935331 0.353773 96.5254 541.044)\" fill=\"#AEDAFC\"/>\r\n        <path d=\"M933.467 950.382C871.013 930.545 853.665 900.844 853.665 847.892C853.665 794.94 891.831 742.096 933.467 758.627C975.104 775.157 995.922 801.553 995.922 854.504C995.922 907.456 995.922 970.218 933.467 950.382Z\" fill=\"#AEDAFC\"/>\r\n        <rect width=\"66.8766\" height=\"36.214\" rx=\"18.107\" transform=\"matrix(-0.788504 -0.61503 0.723831 -0.689977 686.798 1216.9)\" fill=\"#AEDAFC\"/>\r\n    </svg>\r\n</div>\r\n";
},"useData":true});
})();
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
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"headTitleText") || (depth0 != null ? lookupProperty(depth0,"headTitleText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"headTitleText","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":21}}}) : helper)))
    + " <span class=\"auth__block_header_blue\">Plan</span>exa\r\n</div>\r\n";
},"useData":true});
})();
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
    + alias4(((helper = (helper = lookupProperty(helpers,"inputPlaceholder") || (depth0 != null ? lookupProperty(depth0,"inputPlaceholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputPlaceholder","hash":{},"data":data,"loc":{"start":{"line":1,"column":46},"end":{"line":1,"column":66}}}) : helper)))
    + "\" type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"inputType") || (depth0 != null ? lookupProperty(depth0,"inputType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputType","hash":{},"data":data,"loc":{"start":{"line":1,"column":74},"end":{"line":1,"column":87}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"inputId") || (depth0 != null ? lookupProperty(depth0,"inputId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputId","hash":{},"data":data,"loc":{"start":{"line":1,"column":93},"end":{"line":1,"column":104}}}) : helper)))
    + "\">\r\n";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['logo'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"/\">\r\n    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":12}}}) : helper)))
    + "\r\n    <svg fill=\"none\" height=\"82\" viewBox=\"0 0 77 82\" width=\"77\" xmlns=\"http://www.w3.org/2000/svg\">\r\n        <path d=\"M20.8081 46.2156C19.1349 45.2344 16.9938 45.814 16.0259 47.5102C15.058 49.2064 15.6298 51.3768 17.303 52.358C20.6302 54.3092 23.0875 57.6047 23.9587 61.4967C24.3864 63.4077 26.2613 64.6053 28.1464 64.1717C30.0315 63.738 31.2129 61.8374 30.7851 59.9264C29.4732 54.065 25.7837 49.1334 20.8081 46.2156Z\"\r\n              fill=\"#4277FA\"/>\r\n        <path d=\"M28.932 17.454C27.3851 16.279 25.1914 16.5978 24.0323 18.1659C22.8915 19.7095 21.0839 20.6971 19.0479 20.6971C17.1149 20.6971 15.5479 22.2856 15.5479 24.2452C15.5479 26.2047 17.1149 27.7933 19.0479 27.7933C23.3817 27.7933 27.2286 25.6759 29.6343 22.421C30.7934 20.8528 30.479 18.629 28.932 17.454Z\"\r\n              fill=\"#4277FA\"/>\r\n        <path d=\"M53.7692 20.7861C53.4955 18.8463 51.7224 17.4987 49.8089 17.7761C47.8954 18.0536 46.5661 19.8511 46.8398 21.7909C47.7935 28.5501 52.5786 34.0403 58.8905 35.9447C60.7432 36.5036 62.6921 35.4342 63.2435 33.5561C63.7949 31.6779 62.7399 29.7023 60.8873 29.1433C57.1584 28.0183 54.3306 24.7647 53.7692 20.7861Z\"\r\n              fill=\"#4277FA\"/>\r\n        <path clip-rule=\"evenodd\"\r\n              d=\"M0 48.8846C0 45.4575 0.980423 42.2625 2.67244 39.5721C0.970823 36.4956 0 32.946 0 29.1731C0 18.7881 7.33274 10.1435 17.0377 8.26359C20.4781 3.27341 26.1935 0 32.6667 0C34.6968 0 36.6581 0.32305 38.5 0.922929C40.3419 0.32305 42.3032 0 44.3333 0C50.8065 0 56.5219 3.27341 59.9623 8.26359C69.6673 10.1435 77 18.7881 77 29.1731C77 29.5098 76.9923 29.8447 76.977 30.1777C76.8211 33.5792 75.8778 36.772 74.3277 39.5733C76.0185 42.2635 77 45.4604 77 48.8846C77 55.0044 73.8745 60.3781 69.1617 63.4645C69.2017 63.8559 69.2222 64.2528 69.2222 64.6538C69.2222 70.968 64.173 76.0865 57.9444 76.0865C57.7137 76.0865 57.4846 76.0795 57.2573 76.0657C54.8852 79.6422 50.856 82 46.2778 82C43.3699 82 40.6812 81.0467 38.5 79.4362C36.3188 81.0467 33.6301 82 30.7222 82C26.144 82 22.1147 79.6422 19.7426 76.0656C19.5152 76.0795 19.2861 76.0865 19.0556 76.0865C12.827 76.0865 7.77778 70.968 7.77778 64.6538C7.77778 64.2528 7.79829 63.8559 7.83835 63.4645C3.12555 60.3781 0 55.0044 0 48.8846ZM22.1782 13.2864C24.2568 9.58175 28.1776 7.09615 32.6667 7.09615C33.4668 7.09615 34.2467 7.17471 35 7.32421V73.1771C33.8822 74.2509 32.3778 74.9039 30.7222 74.9039C28.0694 74.9039 25.796 73.2194 24.9026 70.8358C24.2285 69.0373 22.2632 68.1111 20.4723 68.7479C20.0334 68.904 19.5582 68.9904 19.0556 68.9904C16.693 68.9904 14.7778 67.0489 14.7778 64.6538C14.7778 64.0568 14.8948 63.4965 15.1037 62.9883C15.8467 61.1803 15.0039 59.1038 13.2208 58.3495C9.56134 56.8013 7 53.142 7 48.8846C7 43.2237 11.5269 38.6346 17.1111 38.6346C18.6683 38.6346 20.134 38.989 21.4426 39.6192C23.1886 40.46 25.2764 39.7068 26.1059 37.9368C26.9353 36.1668 26.1923 34.0504 24.4463 33.2095C22.2189 32.1369 19.7291 31.5385 17.1111 31.5385C13.7289 31.5385 10.5759 32.5332 7.9213 34.2499C7.32598 32.6749 7 30.9642 7 29.1731C7 21.8478 12.4773 15.8148 19.5044 15.0605C20.6255 14.9402 21.6208 14.2798 22.1782 13.2864ZM42 73.1771C43.1178 74.2509 44.6222 74.9039 46.2778 74.9039C47.9017 74.9039 49.3834 74.2726 50.4935 73.2362C48.1471 71.1412 46.6667 68.0728 46.6667 64.6538C46.6667 62.6943 48.2337 61.1058 50.1667 61.1058C52.0997 61.1058 53.6667 62.6943 53.6667 64.6538C53.6667 67.017 55.5313 68.9387 57.8505 68.9894L57.9444 68.9904C60.307 68.9904 62.2222 67.0489 62.2222 64.6538C62.2222 64.0568 62.1052 63.4965 61.8963 62.9883C61.1533 61.1803 61.9961 59.1038 63.7792 58.3495C67.4387 56.8013 70 53.142 70 48.8846C70 47.7073 69.8051 46.5778 69.4458 45.5264C65.8031 48.6076 61.1151 50.4615 56 50.4615C54.067 50.4615 52.5 48.873 52.5 46.9135C52.5 44.9539 54.067 43.3654 56 43.3654C63.5095 43.3654 69.6382 37.3716 69.9846 29.8458C69.9948 29.6229 70 29.3986 70 29.1731C70 21.8478 64.5227 15.8148 57.4956 15.0605C56.3745 14.9402 55.3792 14.2798 54.8218 13.2864C52.7432 9.58175 48.8224 7.09615 44.3333 7.09615C43.5332 7.09615 42.7533 7.17471 42 7.32421V73.1771Z\"\r\n              fill=\"#4277FA\"\r\n              fill-rule=\"evenodd\"/>\r\n    </svg>\r\n</a>\r\n";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['loginPage'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"decoration"),depth0,{"name":"decoration","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"auth__form\">\r\n    <div class=\"auth__block\">\r\n        <div class=\"auth__block_logo\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"logo"),depth0,{"name":"logo","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"headTitle"),depth0,{"name":"headTitle","hash":{"headTitleText":"Вход в "},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"descp"),depth0,{"name":"descp","hash":{"descpText":"Planexa — это визуальный инструмент, который позволяет вашей команде управлять проектами, рабочими процессами и заданиями"},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <form method=\"POST\" id=\"input_form\" class=\"auth__block_form\" action=\"base.html\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"input"),depth0,{"name":"input","hash":{"inputId":"input_login","inputType":"text","inputPlaceholder":"Укажите логин"},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"input"),depth0,{"name":"input","hash":{"inputId":"input_pass","inputType":"password","inputPlaceholder":"Введите пароль"},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"button"),depth0,{"name":"button","hash":{"buttonText":"Войти"},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </form>\r\n        <div class=\"auth__block_signup\">\r\n            <div class=\"auth__block_dont\">\r\n                Нет аккаунта Planexa?\r\n            </div>\r\n            <div>\r\n                <a class=\"auth__block_link\" href=\"signup.html\">Зарегистрироваться</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
})();
