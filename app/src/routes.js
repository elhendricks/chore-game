routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'welcome',
        url: '/',
        template: '<h1>Welcome to the Hipster Almanac</h1>'
    });

    $urlRouterProvider.otherwise('/');
}