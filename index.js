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
		Vue.component('vf-password', require('./form/fields/password.vue'));
		Vue.component('vf-checkbox', require('./form/fields/checkbox.vue'));
		Vue.component('vf-checkboxes', require('./form/fields/checkboxes.vue'));
		Vue.component('vf-submit', require('./form/fields/submit.vue'));
		Vue.component('vf-hidden', require('./form/fields/hidden.vue'));
		Vue.component('vf-select', require('./form/fields/select.vue'));
	}
};
export var statusBar = {
	install: function(Vue, options) {
		Vue.component('status-bar', require('./status-bar.vue'));
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
		Vue.component('button-bar', require('./button-bar.vue'));
	}
};
export var heading = {
	install: function(Vue, options) {
		Vue.component('app-heading', require('./heading/app-heading.vue'));
		Vue.component('heading', require('./heading.vue'));
	}
};
export var tab = {
	install: function(Vue, options) {
		Vue.component('tab', require('./tab.vue'));
		Vue.component('tabs', require('./tabs.vue'));
	}
};
