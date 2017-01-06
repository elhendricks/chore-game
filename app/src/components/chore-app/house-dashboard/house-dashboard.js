import template from './house-dashboard.html';
import styles from './house-dashboard.scss';

export default {
    template,
    controller, 
    bindings: {
        id: '<',
        house: '<', 
        user: '<'
    }
};

function controller() {
    this.styles = styles;
}
