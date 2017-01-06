import template from './chore-pie-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<'
    }, 
    controller
};

// controller.$inject = ['$element'];

function controller() {

    this.$onInit = () => {

        

        // the house target for each chore & name
        // the house target for all chores & name

        // the user total for each chore for Jan 17 & name
        // the user total for all chores for Jan 17 & name
        this.choreTargets = this.house.chores.reduce((acc, chore) => {
            console.log(acc);
            var id = chore._id;
            acc[id] = chore.target || 0;
            return acc;
        }, {});
        // this.sumChoreTargets = this.house.chores.reduce((acc, curr) => {
        //     if (curr.target) return acc += parseInt(curr.target);  
        //     else return acc;
        // }, 0);

        this.houseCompleted = this.house.chores.reduce((acc, chore) => {
            if (!chore.completed) return acc;
            var id = chore._id;
            acc[id] = chore.completed['Jan 2017'] || 0;
            console.log(acc);
            return acc;
        }, {});

        // console.log(this.house.chores);
        // this.sumHouseCompleted = this.house.chores.reduce((acc, curr) => {
        //     if (curr.completed && curr.completed['Jan 2017']) return acc += parseInt(curr.completed['Jan 2017']);  
        //     else return acc;
        // }, 0);

        let target = this.choreTargets;
        let completed = this.houseCompleted;

        console.log('target', target);
        console.log('completed', completed);
    
        function getChoreDifference(id) {
            return [target[id], target[id] - completed[id]];
        }        

        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        let array = getChoreDifference('586e7f1e4a8e3350e5bc4ebd');
        var chorePieChart = new Chart('chorePieChart', {
            type: 'pie',
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{
                    label: 'Times Completed',
                    data: array,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    
                }
            }
        });

        
    };
    
}