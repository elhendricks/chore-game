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
// TODO: Figure out how to get current date string and swap out 'Jan17' placeholders.
// TODO: Refactor to remove any keys that are falsey. 
// TODO: Send only the truthy names 

        const arr = []

        for (var key in this.data) {
            if (this.data[key] == true) {
                arr.push(key);
                
        //         this.userChores = this.user.choreUnits;
        //             // //if the user has done the chore before, 
        //             // // add the units (time) to existing units, 

        //         //  build an object to send to user
        //         if (this.userChores && this.userChores[key] && this.userChores[key]['Jan17']) {
        //             this.userChores[key]['Jan17'] ++;
        //         }
        //         // // else  (the user has never done that chore)
        //         // // add it to user    Chores and updateUser
        //         else if (this.userChores && this.chores[key]) {
        //             this.userChores[key]['Jan17'] = 1;
        //         }

        //         else {
        //             if (!this.userChores) {this.userChores = {}}
        //             this.userChores[key] = {'Jan17': 1};
        //         }

        //         //build an object to send to chore

        //         objToSend[key] = this.data[key];

        //         // ideally would send: {sweepingId: true, testChoreId: true}
                
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