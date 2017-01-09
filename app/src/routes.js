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
        name: 'about',
        url: '/about',
        component: 'about',
        data: {
            public: true
        }
    });

    $stateProvider.state({
        name: 'userDashboard',
        url: '/user',
        component: 'userDashboard',
        resolve: {

            user: ['userService', User => {
                return User.get().$promise;
            }],

            house: ['user', 'houseService', '$transition$', (user, House) => {
                return House.get(user.houseId);
            }]
        }
    });

    $stateProvider.state({
        name: 'houseDashboard',
        url: '/house/',
        component: 'houseDashboard',
        resolve: {
            user: ['userService', User => {
                return User.get().$promise;
            }],
            id: ['user', user => {
                return user.houseId;
            }],
            house: ['id', 'houseService', (id, House) => {
                return House.get(id);
            }]
        }
    });

    $stateProvider.state({
        name: 'charts',
        url: '/charts',
        component: 'chart',
        // abstract: true,
        default: 'charts.detail',
        resolve: {
            user: ['userService', User => {
                return User.get().$promise;
            }],
            id: ['user', user => {
                return user.houseId;
            }],
            house: ['id', 'houseService', (id, House) => {
                return House.get(id);
            }],
            chores: ['house', 'choreService', (house, choreService) => {
                var choreArr = house.chores.map(chore => chore._id);
                return choreService.getHouseChores({date: 'Jan 2017', chores: choreArr});
            }]
        }
    });

    $stateProvider.state({
        name: 'charts.detail',
        url: '/:choreId?style',
        params: {
            choreId: {
                dynamic: true
            },
            style: {
                dynamic: true
            }
        },
        component: 'houseChart',
        resolve: {
            choreId: ['$transition$', t => t.params().choreId ],
            style: ['$transition$', t => t.params().style]
        },
    });

    // $stateProvider.state({
    //     name: 'charts.allbar',
    //     url: '/allbar',
    //     component: 'choreBarChart',
    // });

    // $stateProvider.state({
    //     name: 'charts.pie',
    //     url: '/pie/:choreId?style',
    //     resolve: {
    //         choreId: ['$transition$', t => t.params().choreId],
    //         style: ['$transition$', t => t.params().style]
    //     },
    //     component: 'chorePieChart',
    // });

    // $stateProvider.state({
    //     name: 'charts.bar',
    //     url: '/bar/:choreId',
    //     resolve: {
    //         choreId: ['$transition$', t => t.params().choreId]
    //     },
    //     component: 'houseBarChart',
    // });

    $urlRouterProvider.otherwise('/');
}
