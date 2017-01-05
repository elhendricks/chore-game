import template from './user-dashboard.html';
import styles from './user-dashboard.scss';

export default {
    template,
    controller,
    bindings: {
        user: '<', 
        house: '<'
    }
};



function controller() {
    this.styles = styles;

    this.joinHouseForm = false;
    this.createHouseForm = false;

    this.joinHouseToggle = function() {
        this.joinHouseForm = this.joinHouseForm ? false: true;
    };

    this.createHouseToggle = function() {
        this.createHouseForm = this.createHouseForm ? false: true;
    };
}
