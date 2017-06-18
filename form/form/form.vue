<template>
	<form :action="this.action" :method="this.method" :class="this.opts.layout" @submit.prevent="submit()" novalidate enctype="multipart/form-data" ref="form">
		<vf-hidden name="_method" value="delete" v-if="method.toLowerCase() == 'delete'"></vf-hidden>
		<vf-hidden name="_method" value="patch" v-if="method.toLowerCase() == 'patch'"></vf-hidden>
		<slot></slot>
	</form>
</template>

<style lang="sass">
	@import '~sweetalert2/src/sweetalert2.scss';
</style>

<script>
	import defaultOptions from '../options/options'
	import merge from 'merge'
	import querystring from 'query-string';
	require('style-loader!css-loader!less-loader!bootstrap/less/bootstrap.less')

	window.globalFormOptions = (window.globalFormOptions == undefined) ? {} : window.globalFormOptions;

	export default {
		props: {
			ajax: {
				type: Boolean,
				required: false,
				default: false
			},
			action: {
				type: String
			},
			method: {
				type: String,
				required:false,
				default: 'POST'
			},
			options:{
				type: Object,
				required:false,
				default: function() {
					return {
					}
				}
			},
			msg: {
				type: String,
				default: function() {
					return '';
				}
			},
			confirm: {
				type: String,
				default: '',
				required: false
			},
			redirect: {
				type: String,
				default: '',
				required: false
			},
			url: {
				required: false,
				type: String,
				default: ''
			},
			asstring: {
				type: Boolean,
				default: false
			},
			statusbar: {
				type: String,
				default: undefined
			},
		},
		data: function() {
			return {
				globalOptions: window.globalFormOptions,
				isForm: true,
				sending:false,
				methods: {'delete': 'post', 'post': 'post', 'get': 'get', 'patch': 'post'},
				model: false,
				submitConfirm: false,
			}
		},
		computed: {
			opts: function() {
 				let options = merge.recursive(defaultOptions(), window.globalFormOptions);
 				return merge.recursive(options, this.options);
			},
			isAjax: function() {
				return this.option('ajax') != undefined && this.option('ajax') == true || this.ajax;
			},
			realMethod: function() {
				return this.methods[this.method.toLowerCase()];
			}
		},
		methods: {
			option: function(key) {
				return this.opts[key];
			},
			getData: require('./m_get-data.js').default,
			getField: require('./m_get-field.js').default,
			getTable: require('./m_get-table.js').default,
			submit: require('../methods/submit.js').default,
			getModel: require('./m_get-model.js').default,
			requireValue: require('./m_require-value.js').default,
			setConfirm: function(value) {
				this.submitConfirm = {v: value};
			},
			resetConfirm: function() {
				this.submitConfirm = false;
			},
			modifyData: function(data) {
				return (this.asstring) ? querystring.stringify(data) : data;
			}
		},
		created: function() {
			this.getModel(this);
		}
	}
</script>


