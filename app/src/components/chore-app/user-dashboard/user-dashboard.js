import template from './user-dashboard.html';
import styles from './user-dashboard.scss';

export default {
    template,
    controller,
    bindings: {
        user: '<'
    }
};

function controller() {
    this.styles = styles;
    this.joinHouseForm = false;
    this.toggle = function() {
        this.joinHouseForm = this.joinHouseForm ? false: true;
    };
}
