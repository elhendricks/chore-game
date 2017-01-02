import template from 'user-auth.html';

export default {
    template,
    controller,
    bindings: {
        success: '<'
    }
};

function controller() {
    this.action = 'signin';
}