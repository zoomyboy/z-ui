<template>
	<div class="vf-field vf-field-date form-group">
		<label v-if="getForm().option('showLabel')" for="">{{ label }}</label>
		<input ref="input" type="text" :class="getForm().option('fieldClass')" v-model="curValue" :placeholder="label">
		<span class="label label-danger" v-if="error !== false">{{ error }}</span>
	</div>
</template>

<style lang="less">
	@import '~uiStyle';
	.vf-field-time {
		input {
			.field-focus(@field-focus);
			height: @field-height;
		}
	}
</style>

<script>
	require('jquery-datetimepicker');
	var moment = require('moment');
	require("jquery-datetimepicker/jquery.datetimepicker.css");

	$.datetimepicker.setLocale('de');

	export default {
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
				return moment(this.curValue, 'DD.MM.YYYYY').format('YYYY-MM-DD');
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
		data: function() {
			return {
				isField: true,
				curValue: '',
				error: false
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

			$(this.$refs.input).datetimepicker({
				datepicker:true,
				timepicker: false,
				format:'d.m.Y',
				step: vm.step,
				onChangeDateTime: function(dp, $input) {
					vm.curValue = $input.val();
				}
			});

			var vm = this;

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});
		}
	};
</script>
