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
}
