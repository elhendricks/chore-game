import template from './signup.html';

export default {
    template,
    controller,
    bindings: {
        success: '<'
    }
};

controller.$inject = ['userService'];

function controller(userService) {
    this.credentials = {
        email: '',
        username: '',
        password: ''
    };

    this.authenticate = () => {
        return userService.signup(this.credentials)
        .then(() => {
            this.success();
        })
        .catch(error => {
            this.error = error;
        });
    };
}
