<template>
	<div ref="wrapper" class="vf-field vf-field-file form-group">
		<label v-if="getForm().option('showLabel')" for="">{{ label }}</label>

		<input ref="input" :name="name" type="file" :class="getForm().option('fieldClass')" >

		<span class="label label-danger" v-if="error !== false">{{ error }}</span>
	</div>
</template>

<style lang="less">
	@import '~uiStyle';
	@import '~bootstrap-fileinput-npm/css/fileinput.min.css';
	.vf-field-text {
		input {
			.field-focus(@field-focus);
			height: @field-height;
		}
		label {
			color: @field-label-color;
		}
		.input-group-addon > span {
			cursor: pointer;
			font-size: 14pt;
		}
		.input-group-addon:first-of-type {
			border-left: 0;
		}
	}
</style>

<script>
	require('bootstrap-fileinput-npm');

	export default {
		data: function() {
			return {
				isField: true,
				curValue: [],
				error: false
			}
		},
		props: {
			label: {
				default: false,
				required: false
			},
			name: {
				required: true,
			},
			value: {
				default: function() {
					return [];
				},
				type: Array
			},
			uploadurl: {
				required: false,
				default: '/api/image',
				type: String
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setValue: function(newVal) {
				this.curValue = newVal;
			},
			getForm: require('../methods/get-form.js'),
			ajaxHeaders: function() {
				var ret = {};

				if (typeof(window.Laravel != undefined)) {
					ret['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
				}

				return ret;
			}
		},
		watch: {
			value: function(newVal) {
				this.setValue(newVal);
			}
		},
		mounted: function() {
			var vm = this;
			this.curValue = this.value;

			this.$events.listen('model-loaded', function(form) {
				if (form == vm.getForm()) {
					vm.getForm().requireValue(vm.name);
				}
			});

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});

			$(this.$refs.input).fileinput({
				uploadUrl: vm.uploadurl,
				uploadExtraData: function(previewId, index) {
					return {};
				},
				ajaxSettings: {headers: vm.ajaxHeaders()},
				ajaxDeleteSettings: {headers: vm.ajaxHeaders()}
			});

			$(this.$refs.input).on('fileuploaded', function(event, data, previewId, index) {
				var current = vm.getValue();

				if (typeof current == 'string' && current.length == 0) {
					//No values have been stored yet - store file as first value
					vm.setValue({'image': data.response.initialPreviewConfig[0].key});
				} else {
					current.push({'image': data.response.initialPreviewConfig[0].key});
					vm.setValue(current);
				}
			}).on('filedeleted', function(event, key, jqXHR, data) {
				var current = vm.getValue();

				vm.setValue(current.filter(function(file) {
					return file != key;
				}));
			});

			$(this.$refs.wrapper).find('.fileinput-upload').click(function(e) {
				e.preventDefault();
				$(vm.$refs.input).fileinput('upload');
			});
		}
	};
</script>
