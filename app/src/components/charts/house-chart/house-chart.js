import template from './house-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<',
        chores: '<'
    }, 
    controller
};

function controller() {

    this.$onInit = () => {

        this.sumTargets = 0;
        this.sumCompleted = 0;
        for (var key in this.chores) {
            this.sumTargets += this.chores[key].target;
            this.sumCompleted += this.chores[key].currentCompleted;
        }

        function targetCompletedDelta(target, completed) {
            var labels, data;
            if (target - completed >= 0) {
                labels = ['completed', 'remaining'];
                data = [completed, target-completed];                 
            } else {
                labels =  ['target', 'surplus'];
                data = [target, completed-target];
            }
            return {labels, data};
        }

        var sumChoreByUser = (userId) => {
            var sum = 0;
            for (let chore in this.chores) {
                console.log(this.chores[chore]);
                if (this.chores[chore].userCompleted && this.chores[chore].userCompleted[userId]) {
                    sum += this.chores[chore].userCompleted[userId];
                }
            }
            return sum;
        };

        var configPie = (id) => {            
            var pieConfig;
            if (id === 'all') {
                pieConfig = targetCompletedDelta(this.sumTargets, this.sumCompleted);           
            } else {  
                let currentChore = this.chores[id];
                pieConfig = targetCompletedDelta(currentChore.target, currentChore.currentCompleted);        
            }
            return pieConfig;
        };

        var configBar = (id) => {
            var labels = [], data = [];
            if (id === 'all') {
                this.house.users.forEach( user => {
                    labels.push(user.username);
                    data.push(sumChoreByUser(user._id) || 0);
                });
            } else {
                let currentChore = this.chores[id];
                this.house.users.forEach( user => {
                    labels.push(user.username);
                    data.push(currentChore.userCompleted[user._id] || 0);
                });
            }
            return {labels, data};
        };
        
        this.renderChart = (id, style) => {
            var labels;
            var data;

            if (style === 'pie') ({labels, data} = configPie(id));
            if (style === 'bar') ({labels, data} = configBar(id));

            new Chart('currentChart', {
                type: style,
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Times Completed',
                        data: data,
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

        this.renderChart('all', 'pie');
       
    };

    
    
}