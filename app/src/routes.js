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
            
        }
    });

    $stateProvider.state({
        name: 'charts.detail',
        url: '/:choreId?style&month&year',
        params: {

        },
        component: 'houseChart',
        resolve: {
            choreId: ['$transition$', t => t.params().choreId ],
            style: ['$transition$', t => t.params().style],
            year: ['$transition$', t => t.params().year],
            month: ['$transition$', t => t.params().month],
            chores: ['house', 'choreService', 'year', 'month', (house, choreService, year, month) => {
                var choreArr = house.chores.map(chore => chore._id);
                var date = new Date(year, month).toJSON();
                var newChores = choreService.getHouseChores({chores: choreArr, date});
                return newChores;
            }]
        },
    });

    $urlRouterProvider.otherwise('/');
}
