import template from './nav.html';
import styles from './nav.scss';

export default {
    template,
    styles,
    controller,
    bindings: {
        authenticate: '<'
    }
};

function controller() {
    this.styles = styles;
}
