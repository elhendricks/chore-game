import template from './user-auth.html';
import styles from './user-auth.scss';

export default {
    template,
    controller,
    bindings: {
        success: '<'
    }
};

function controller() {
    this.styles = styles;
}