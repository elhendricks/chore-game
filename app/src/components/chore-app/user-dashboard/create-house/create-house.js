import template from './create-house.html';

export default {
    template,
    controller,
    bindings: {
        user: '<',
        house: '<'
    }
};

controller.$inject = ['houseService', '$state'];

function controller(houseService, $state) {
    this.createHouseForm = false;

    this.toggle = function() {
        this.createHouseForm = this.createHouseForm ? false: true;
    };

    this.reset = () => {
        this.name = '';
        this.code = '';
    };

    this.createHouse = () => {
        houseService.add({
            name: this.name, 
            code: this.code
        });
  
        houseService.join({name: this.name, code: this.code});
        this.reset();
        $state.go('houseDashboard');
    };
}