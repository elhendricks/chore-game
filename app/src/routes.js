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
        component: 'userDashboard',
        resolve: {
            id: ['$transition$', t => t.params().id],
            user: ['id', 'userService', (id, User) => User.get({id})]
        }
    });

    $stateProvider.state({
        name: 'houseDashboard',
        url: '/house/:id',
        component: 'houseDashboard',
        resolve: {
            id: ['$transition$', t => t.params().id],
            house: ['id', 'houseService', (id, House) => House.get({id})]
        },
        data: {
            public: true
        }
    });
    // .state({
    //     name: 'houseDashboard.choreInput',
    //     url: '/enterchore',
    //     component: ''
    // })

    $urlRouterProvider.otherwise('/');
}