export var wizard = {
	install: function(Vue, options) {
		Vue.component('wizard', require('./wizard.vue'));
		Vue.component('w-child', require('./wizard-child.vue'));
	}
};
export var form = {
	install: function(Vue, options) {
		Vue.component('vf-form',require('./form/form/form.vue'));
		Vue.component('vf-text', require('./form/fields/text.vue'));
		Vue.component('vf-textarea', require('./form/fields/textarea.vue'));
		Vue.component('vf-password', require('./form/fields/password.vue'));
		Vue.component('vf-checkbox', require('./form/fields/checkbox.vue'));
		Vue.component('vf-checkboxes', require('./form/fields/checkboxes.vue'));
		Vue.component('vf-submit', require('./form/fields/submit.vue'));
		Vue.component('vf-hidden', require('./form/fields/hidden.vue'));
		Vue.component('vf-select', require('./form/fields/select.vue'));
		Vue.component('vf-time', require('./form/fields/time.vue'));
		Vue.component('vf-date', require('./form/fields/date.vue'));
		Vue.component('vf-range', require('./form/fields/range.vue'));
		Vue.component('vf-switch', require('./form/fields/switch.vue'));
		Vue.use(require('vue-inputmask'));
	}
};
export var statusbar = {
	install: function(Vue, options) {
		Vue.component('statusbar', require('./statusbar.vue'));
	}
};
export var table = {
	install: function(Vue, options) {
		Vue.component('v-link', require('./link.vue'));
		Vue.component('v-table', require('./table.vue'));
	}
};
export var link = {
	install: function(Vue, options) {
		Vue.component('v-link', require('./link.vue'));
		Vue.component('buttonbar', require('./button-bar.vue'));
	}
};
export var heading = {
	install: function(Vue, options) {
		Vue.component('appheading', require('./heading/appheading.vue'));
		Vue.component('heading', require('./heading.vue'));
	}
};
export var tab = {
	install: function(Vue, options) {
		Vue.component('tab', require('./tab.vue'));
		Vue.component('tabs', require('./tabs.vue'));
	}
};
export var dropdown = {
	install: function(Vue, options) {
		Vue.component('dropdown', require('./dropdown.vue'));
		Vue.component('dropdown-link', require('./dropdownlink.vue'));
	}
};
