import template from './user-dashboard.html';
import styles from './user-dashboard.scss';

export default {
    template,
    controller,
    bindings: {
        user: '<', 
        house: '<'
    }
};



function controller() {
    this.styles = styles;
}
