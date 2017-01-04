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
            user: ['userService', User => User.get()]
        }
    });

    $stateProvider.state({
        name: 'houseDashboard',
        url: '/house/:id',
        component: 'houseDashboard',
        resolve: {
            id: ['$transition$', t => t.params().id],
            house: ['id', 'houseService', (id, House) => House.get({id})],
            user: ['userService', User => {
                return User.get();
            }],
        }//,
        // data: {
        //     public: true
        // }
    });
    // .state({
    //     name: 'houseDashboard.choreInput',
    //     url: '/enterchore',
    //     component: ''
    // })

    $urlRouterProvider.otherwise('/');
}