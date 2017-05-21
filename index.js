export default {
	install: function(Vue, options) {
		Vue.component('wizard', require('./wizard.vue'));
		Vue.component('w-child', require('./w-child.vue'));
		Vue.component('status-bar', require('./status-bar.vue'));
	}
};
