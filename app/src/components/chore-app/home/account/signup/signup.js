import template from './signup.html';
import styles from './signup.scss';

export default {
    template,
    controller,
    bindings: {
        success: '<'
    }
};

controller.$inject = ['authService'];

function controller(authService) {
    this.styles = styles;

    this.credentials = {
        name: '',
        email: '',
        username: '',
        password: ''
    };

    this.authenticate = () => {
        return authService.signup(this.credentials)
        .then(() => {
            this.success();
        })
        .catch(error => {
            this.error = error;
        });
    };
}
