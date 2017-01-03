import template from './chore-input.html';

export default {
    template, 
    controller, 
    bindings: {
        chores: '<'
    }
};
controller.$inject = ['userService'];
function controller(userService) {

    this.enterChore = function(name, time) {
      //TODO: PUT to user.choreUnits 
      // On backend refactor to update chore units with new data. 
    }
}