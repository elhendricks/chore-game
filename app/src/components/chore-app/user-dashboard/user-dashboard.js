import template from './user-dashboard.html';

export default {
    template,
    controller
};

controller.$inject = ['userService'];

function controller(userService) {
    this.users = userService.query({});

}
