import template from './chore-pie-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<'
    }, 
    controller
};

function controller() {

    this.$onInit = () => {

        this.choreTargets = this.house.chores.reduce((acc, chore) => {
            console.log(acc);
            var id = chore._id;
            acc[id] = chore.target || 0;
            return acc;
        }, {});

        this.houseCompleted = this.house.chores.reduce((acc, chore) => {
            if (!chore.completed) return acc;
            var id = chore._id;
            acc[id] = chore.completed['Jan 2017'] || 0;
            console.log(acc);
            return acc;
        }, {});

        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        this.renderChorePieChart = (id) => {
            let array = [this.choreTargets[id], this.choreTargets[id] - this.houseCompleted[id]];
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

        this.renderChorePieChart('586e7f1e4a8e3350e5bc4ebd');
        
    };
    
}