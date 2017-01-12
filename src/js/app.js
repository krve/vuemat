
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

// Directives
Vue.directive('ripple', require('./directives/Ripple.vue'));

// Components
Vue.component('md-btn', require('./components/Btn.vue'));
Vue.component('md-icon', require('./components/Icon.vue'));
Vue.component('md-chip', require('./components/Chip.vue'));
Vue.component('md-widget', require('./components/Widget.vue'));
Vue.component('md-alert', require('./components/Alert.vue'));
Vue.component('md-input', require('./components/Input.vue'));
Vue.component('md-radio', require('./components/Radio.vue'));
Vue.component('md-checkbox', require('./components/Checkbox.vue'));
Vue.component('md-button', require('./components/Button.vue'));
Vue.component('md-tooltip', require('./components/Tooltip.vue'));
Vue.component('md-card', require('./components/Card.vue'));
Vue.component('md-dropdown', require('./components/Dropdown.vue'));
Vue.component('md-dropdown-item', require('./components/DropdownItem.vue'));
Vue.component('md-dropdown-group', require('./components/DropdownGroup.vue'));
Vue.component('md-select', require('./components/Select.vue'));
Vue.component('md-datepicker', require('./components/Datepicker.vue'));
Vue.component('md-modal', require('./components/Modal.vue'));
Vue.component('md-tabs', require('./components/Tabs.vue'));
Vue.component('md-tab', require('./components/Tab.vue'));

// New vue instance
const app = new Vue({
    el: '#app',

    methods: {
        openModal(ref) {
            this.$refs[ref].open();
        },

        closeModal(ref) {
            this.$refs[ref].close();
        }
    }
});
