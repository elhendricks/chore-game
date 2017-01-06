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
            var sumTargetChart = new Chart('sumTargetChart', { //eslint-disable-line

                type: 'pie',
                data: {
                    labels: ['Completed', 'Remaining'],
                    datasets: [{
                        label: 'Times Completed',
                        data: [this.sumHouseCompleted, this.sumChoreTargets - this.sumHouseCompleted],
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

        this.renderHousePieChart();
       
    };
    
}