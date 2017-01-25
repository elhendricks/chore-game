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

    var today = new Date();

    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();

    this.styles = styles;

    this.chartStyle = 'pie';
    this.selectedChart = 'all';

    this.updateChart = function() {
        $state.go('charts.detail', {choreId: this.selectedChore, style: this.chartStyle, month: this.selectedMonth, year: this.selectedYear});
    };
}