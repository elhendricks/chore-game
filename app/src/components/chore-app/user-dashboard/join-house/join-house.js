import template from './join-house.html';

export default {
    template,
    controller,
    bindings: {
        user: '<',
        house: '<'
    }
};

controller.$inject = ['houseService'];

function controller(houseService) {
    this.joinHouseForm = false;

    this.toggle = function() {
        this.joinHouseForm = this.joinHouseForm ? false: true;
    };

    this.reset = () => {
        this.name = '';
        this.code = '';
    };

    this.joinHouse = () => {
        houseService.join({name: this.name, code: this.code});
        this.reset();
    };
}