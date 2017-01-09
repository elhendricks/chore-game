import template from './chore-bar-chart.html';
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

        this.choreTargets = this.house.chores.map(chore => {
            return chore.target;
        });
        this.sumChoreTargets = this.house.chores.reduce((acc, curr) => {
            if (curr.target) return acc += parseInt(curr.target);  
            else return acc;
        }, 0);

        this.houseCompleted = this.house.chores.map(chore => {
            if (!chore.completed) return null;
            return chore.completed['Jan 2017'];
        });

        this.sumHouseCompleted = this.house.chores.reduce((acc, curr) => {
            if (curr.completed && curr.completed['Jan 2017']) return acc += parseInt(curr.completed['Jan 2017']);  
            else return acc;
        }, 0);

        function getChoreAmounts(arr) {
            return arr.map(user => {
                if (user.choreUnits.length) {
                    return user.choreUnits.reduce((acc, curr) => {
                        if (curr.completed && curr.completed['Jan 2017']) {
                            acc += curr.completed['Jan 2017'];
                        } 
                        return acc;
                    }, 0);
                } else return 0;

            });
        }

        var userNames = this.house.users.map(user => user.username);
        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        

        this.renderChoreBarChart = () => {
            var chores =  getChoreAmounts(this.house.users);
        
            var choreBarChart = new Chart('choreBarChart', { //eslint-disable-line
                type: 'bar',
                data: {
                    labels: userNames,
                    datasets: [{
                        label: 'Times Completed',
                        data: chores,
                        backgroundColor: '#B2EBF2',
                        borderColor: '#26C6DA',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        
                    }
                }
            });

        };

        this.renderChoreBarChart();
        
    };
    
}