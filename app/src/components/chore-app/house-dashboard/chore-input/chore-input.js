import template from './chore-input.html';

export default {
    template, 
    controller, 
    bindings: {
        chores: '<',
        user: '<', 
        updateUser: '<',
        id: '<'
    }
};

controller.$inject = ['userService', 'choreService'];
function controller(User, Chore) {

    this.enterChore = function() {

        const arr = [];

        for (var key in this.data) {
            if (this.data[key] == true) {
                arr.push(key);                
            }   
        }
        console.log(arr);
        Chore.updateMany(arr);
    };

    this.add = chore => {
        console.log();
        Chore.add(chore)
            .then(saved => this.chores.push(saved))
            .catch(err => console.log(err));
    };
}