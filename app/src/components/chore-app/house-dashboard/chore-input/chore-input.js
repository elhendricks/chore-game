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

        console.log(this.data);
        console.log(this.chores);

        for (var key in this.data) {
            if (this.data[key] == true) {
                this.userChores = this.user.choreUnits;
                    // //if the user has done the chore before, 
                    // // add the units (time) to existing units, 

                if (this.userChores && this.userChores[key] && this.userChores[key]['Jan17']) {
                    this.userChores[key]['Jan17'] ++;
                    console.log(1);
                }
                // // else  (the user has never done that chore)
                // // add it to user    Chores and updateUser
                else if (this.userChores && this.chores[key]) {
                    this.userChores[key]['Jan17'] = 1;
                    console.log(2);
                }

                else {
                    this.userChores[key] = {'Jan17': 1};
                }
            }
            
        }   

        //TODO: handle cases where the user doesn't have any chores
        
            // //update user's choreUnits
        User.update({choreUnits: this.userChores});
    };

    this.add = chore => {
        console.log();
        Chore.add(chore)
            .then(saved => this.chores.push(saved))
            .catch(err => console.log(err));
    };
}