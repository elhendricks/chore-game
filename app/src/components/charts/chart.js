import template from './chart.html';
import styles from './chart.scss';

export default {
    template,
    bindings: {
        house: '<',
        chores: '<'
    }, 
    controller
};

controller.$inject = ['$state'];



function controller($state) {

    this.styles = styles;

    this.chartStyle = 'pie';
    this.selectedChart = 'all';

    this.updateChart = function() {

        $state.go('charts.detail', {choreId: this.selectedChore, style: this.chartStyle});

    //     if (this.chartStyle === 'pie') {
    //         if (this.selectedChore === 'all') {
    //             $state.go('charts.allpie');
    //         } else {
    //             $state.go('charts.pie', {choreId: this.selectedChore});
    //         }
    //     } 

    //     if (this.chartStyle === 'bar') {
    //         if (this.selectedChore === 'all') {
    //             $state.go('charts.allbar');
    //         } else {
    //             $state.go('charts.bar', {choreId: this.selectedChore});
    //         }
    //     }
        
    };

    // this.updateChart();
}