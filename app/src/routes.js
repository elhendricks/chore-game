routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        component: 'welcome',
    });

    $stateProvider.state({
        name: 'signin',
        url: '/signin',
        component: 'signin'
    });

    $stateProvider.state({
        name: 'signup',
        url: '/signup',
        component: 'signup'
    });

    $stateProvider.state({
        name: 'userDashboard',
        url: '/user',
        component: 'userDashboard'
    });

    $stateProvider.state({
        name: 'houseDashboard',
        url: '/house',
        component: 'houseDashboard'
    });

    $urlRouterProvider.otherwise('/');
}