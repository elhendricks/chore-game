import template from './house-bar-chart.html';
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
        var getChoreAmounts = (id, arr) =>  {
            return arr.map(user => {
                if (user.choreUnits.length) {
                    for (var i = 0; i < user.choreUnits.length; i++) {
                        if (user.choreUnits[i].choreId === id && user.choreUnits[i].completed) {
                            return user.choreUnits[i].completed['Jan 2017'] || 0;
                        } else return 0;    
                    }
                } else return 0;

            });
        };

        var userNames = this.house.users.map(user => user.username);

        this.renderHouseBarChart = (id) => {
            var data = getChoreAmounts(id, this.house.users);
            var houseBarChart = new Chart('houseBarChart', {
                type: 'bar',
                data: {
                    labels: userNames,
                    datasets: [{
                        label: 'Times Completed',
                        data: data,
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

        this.renderHouseBarChart('586af7f66f0cc715bf785486');

        
    };
    
}