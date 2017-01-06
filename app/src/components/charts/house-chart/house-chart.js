import template from './house-chart.html';
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

        this.sumChoreTargets = this.house.chores.reduce((acc, curr) => {
            if (curr.target) return acc += parseInt(curr.target);  
            else return acc;
        }, 0);

        this.sumHouseCompleted = this.house.chores.reduce((acc, curr) => {
            if (curr.completed && curr.completed['Jan 2017']) return acc += parseInt(curr.completed['Jan 2017']);  
            else return acc;
        }, 0);

        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        this.renderHousePieChart = () => {
            var completed = this.sumHouseCompleted;
            var remaining =  0;

            if (this.sumChoreTargets - this.sumHouseCompleted >=  0) {
                remaining = this.sumChoreTargets - this.sumHouseCompleted;
            }

            console.log()
            var sumTargetChart = new Chart('sumTargetChart', { //eslint-disable-line
                type: 'pie',
                data: {
                    labels: ['Completed', 'Remaining'],
                    datasets: [{
                        label: 'Times Completed',
                        data: [completed, remaining],
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

        this.renderHousePieChart();
       
    };
    
}