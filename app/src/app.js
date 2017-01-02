import angular from 'angular';
import components from './components';
import services from './services';

//third party 
// import animate from 'angular-animate';
import defaultRoute from 'angular-ui-router-default';
import uiRouter from 'angular-ui-router';
// import resource from 'angular-resource';
// import 'angular-ui-router/release/stateEvents';

// import dialog from 'ng-dialog';
// import 'ng-dialog/css/ngDialog.css';
// import 'ng-dialog/css/ngDialog-theme-default.css';

//route, http config and auth setup
import http from './http';
import routes  from './routes';
// import auth from './auth';

const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    defaultRoute, 
    angular.module('ui.router.state.events').name,
    // resource,
    // dialog,
    // animate
]);

app.config(http);
app.config(routes);
// app.run(auth);

const dev = 'https://pet-store-401.herokuapp.com/api';

app.value('apiUrl', dev);