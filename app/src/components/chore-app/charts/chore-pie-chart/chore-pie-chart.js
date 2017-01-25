import template from './chore-pie-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<',
        choreId: '<'
    }, 
    controller
};

function controller() {

    this.$onInit = () => {

        this.choreTargets = this.house.chores.reduce((acc, chore) => {
            var id = chore._id;
            acc[id] = chore.target || 0;
            return acc;
        }, {});

        this.houseCompleted = this.house.chores.reduce((acc, chore) => {
            if (!chore.completed) return acc;
            var id = chore._id;
            acc[id] = chore.completed['Jan 2017'] || 0;
            return acc;
        }, {});

        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        this.renderChorePieChart = (id) => {

            var completed = this.houseCompleted[id];
            var remaining = 0; 
            if (this.choreTargets[id] - this.houseCompleted[id] >= 0) {
                remaining = this.choreTargets[id] - this.houseCompleted[id]
            }
            let array = [completed, remaining];
            var chorePieChart = new Chart('chorePieChart', { //eslint-disable-line
                type: 'pie',
                data: {
                    labels: ['Completed', 'Remaining'],
                    datasets: [{
                        label: 'Times Completed',
                        data: array,
                        backgroundColor: [
                            '#B2EBF2',
                            '#B9F6CA',
                        ],
                        borderColor: [
                            '#26C6DA',
                            '#00E676',
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

        this.renderChorePieChart(this.choreId);
        
    };
    
}