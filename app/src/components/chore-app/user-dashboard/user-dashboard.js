import template from './user-dashboard.html';
import styles from './user-dashboard.scss';

export default {
    template,
    controller,
    bindings: {
        user: '='
    }
};

controller.$inject = ['userService'];

function controller(userService) {
    this.styles = styles;
    this.users = userService.query({});
    this.joinHouseForm = false;
    this.toggle = function() {
        this.joinHouseForm = this.joinHouseForm ? false: true;
    };
}
