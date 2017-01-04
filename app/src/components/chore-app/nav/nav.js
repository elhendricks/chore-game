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

controller.$inject = ['authService'];

function controller(authService) {
    this.styles = styles;
    this.logout = () => authService.logout();
    this.isAuthenticated = () => authService.isAuthenticated();
}
