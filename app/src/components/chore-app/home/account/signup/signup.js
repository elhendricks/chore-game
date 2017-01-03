import template from './signup.html';

export default {
    template,
    controller,
    bindings: {
        success: '<'
    }
};

controller.$inject = ['authService'];

function controller(authService) {
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
