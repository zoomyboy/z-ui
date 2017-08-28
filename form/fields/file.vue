<template>
	<div class="vf-field vf-field-file form-group">
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
				curValue: '',
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
				default: '',
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
			getForm: require('../methods/get-form.js')
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

			var vm = this;

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});
			console.log(this.$refs);

			$(this.$refs.input).fileinput();
		}
	};
</script>
