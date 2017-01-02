import template from './nav.html';
import styles from './nav.scss';

export default {
    template,
    styles,
    controller
};

function controller() {
    this.styles = styles;
}
