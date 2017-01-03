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
        url: '/user/:id',
        component: 'userDashboard'
        resolve: {
            id: ['$transition$', t => t.params().id],
            house: ['houseService', (House) => {
                House.get
            }]
        } 
    });

    $stateProvider.state({
        name: 'houseDashboard',
        url: '/house/:id',
        component: 'houseDashboard'
    });
    // .state({
    //     name: 'houseDashboard.choreInput',
    //     url: '/enterchore',
    //     component: ''
    // })

    $urlRouterProvider.otherwise('/');
}