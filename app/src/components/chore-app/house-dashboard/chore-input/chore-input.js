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

    this.enterChore = function(name, time) {
 
        this.userChores = this.user.choreUnits;
        //if the user has done the chore before, 
        // add the units (time) to existing units, 

        if (this.userChores && this.userChores[name]) {
            this.userChores[name] += time;
        }

        // else  (the user has never done that chore)
        // add it to userChores and updateUser

        else if (this.userChores) {
            this.userChores[name] = time;
        }

        //update user's choreUnits
        User.update({choreUnits: this.userChores});

        this.name = '';
        this.time = '';

    };

    this.add = chore => {
        console.log();
        Chore.add(chore)
            .then(saved => this.chores.push(saved))
            .catch(err => console.log(err));
    };
}