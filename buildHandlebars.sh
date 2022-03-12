handlebars src/components/button/button.handlebars > src/components/components.templ.js &&
handlebars src/components/decoration/decoration.handlebars >> src/components/components.templ.js &&
handlebars src/components/descp/descp.handlebars >> src/components/components.templ.js &&
handlebars src/components/error/error.handlebars >> src/components/components.templ.js &&
handlebars src/components/headTitle/headTitle.handlebars >> src/components/components.templ.js &&
handlebars src/components/input/input.handlebars >> src/components/components.templ.js &&
handlebars src/components/logo/logo.handlebars >> src/components/components.templ.js &&
cat src/components/components.templ.js > src/loginPage/loginPage.templ.js &&
handlebars src/loginPage/loginPage.handlebars >> src/loginPage/loginPage.templ.js

cat src/components/components.templ.js > src/signupPage/signupPage.templ.js &&
handlebars src/signupPage/signupPage.handlebars >> src/signupPage/signupPage.templ.js

handlebars src/components/leftMenu/leftMenu.handlebars > src/basePage/basePage.templ.js &&
handlebars src/components/cap/cap.handlebars >> src/basePage/basePage.templ.js &&
handlebars src/components/desk/desk.handlebars >> src/basePage/basePage.templ.js &&
handlebars src/components/containerDesk/containerDesk.handlebars >> src/basePage/basePage.templ.js &&
handlebars src/components/activeTask/activeTask.handlebars >> src/basePage/basePage.templ.js &&
handlebars src/components/rightMenu/rightMenu.handlebars >> src/basePage/basePage.templ.js &&
handlebars src/basePage/basePage.handlebars >> src/basePage/basePage.templ.js

rm -r src/components/components.templ.js


