import template from './user-dashboard.html';
import styles from './user-dashboard.scss';

export default {
    template,
    controller,
    bindings: {
        users: '='
    }
};

controller.$inject = ['userService'];

function controller(userService) {
    this.styles = styles;
    this.joinHouseForm = false;
    this.user = userService.get();
    this.toggle = function() {
        this.joinHouseForm = this.joinHouseForm ? false: true;
    };
}
