import template from './signin.html';
import styles from './signin.scss';

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
        username: '',
        password: ''
    };

    this.authenticate = () => {
        return authService.signin(this.credentials)
            .then(() => {
                this.success();
            })
            .catch(error => {
                this.error = error;
            });
    };
    
}
