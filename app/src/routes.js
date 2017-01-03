routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        component: 'welcome',
        data: {
            public: true
        }
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