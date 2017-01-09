import template from './house-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<',
        chores: '<',
        choreId: '<',
        style: '<'
    }, 
    controller
};

controller.$inject = ['$element'];

function controller($element) {

    this.$onInit = () => {

        console.log(this.choreId);
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
            var labels, data, title;            
            var pieConfig;
            if (id === 'all') {
                pieConfig = targetCompletedDelta(this.sumTargets, this.sumCompleted); 
                pieConfig.title = `All Chores for ${this.house.name}`;          
            } else {  
                let currentChore = this.chores[id];
                pieConfig = targetCompletedDelta(currentChore.target, currentChore.currentCompleted); 
                pieConfig.title = `${this.chores[id].name} for ${this.house.name}`;       
            }
 
            return pieConfig;
        };

        var configBar = (id) => {
            var labels = [], data = [], title;
            if (id === 'all') {
                this.house.users.forEach( user => {
                    labels.push(user.username);
                    data.push(sumChoreByUser(user._id) || 0);
                    title = `All Chores for ${this.house.name}`;
                });
            } else {
                let currentChore = this.chores[id];
                this.house.users.forEach( user => {
                    labels.push(user.username);
                    data.push(currentChore.userCompleted[user._id] || 0);
                    title = `${this.chores[id].name} for ${this.house.name}`;
                });
            }
            return {labels, data, title};
        };
        
        this.renderChart = (id, style) => {
            // This is a hacky work around.  Making new charts was just drawing on the same canvas.
            $element.find('canvas').after('<canvas id="currentChart" width="400" height="400"></canvas>').remove();

            var labels;
            var data;
            var title;

            if (style === 'pie') ({labels, data, title} = configPie(id));
            if (style === 'bar') ({labels, data, title} = configBar(id));

            var chart = new Chart('currentChart', {
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
                    layout: {
                        padding: 25
                    },
                }
            });
        };

        this.renderChart(this.choreId, this.style);
       
    };

    this.uiOnParamsChanged = params => {
        if (params.choreId) this.choreId = params.choreId;
        if (params.style) this.style = params.style;
        return this.renderChart(this.choreId, this.style);
    };

    
}