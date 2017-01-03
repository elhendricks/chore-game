auth.$inject = ['$rootScope', 'authService', 'ngDialog', '$state'];

export default function auth($rootScope, authService, ngDialog, $state) {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
        //TODO: remove console.log after working
        console.log('toState.data', toState.data, 'data.public', toState.data.public);
        if(!(toState.data && toState.data.public) && !authService.isAuthenticated()) {
            event.preventDefault();
            const dialog = ngDialog.open({
                template: '<user-auth success="success"></user-auth>',
                plain: true,
                controller: ['$scope', function($scope) {
                    $scope.success = function() {
                        dialog.close();
                        return $state.go(toState.name, toParams);
                    };
                }]
            });
        }
    });
}