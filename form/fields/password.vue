<template>
	<div class="vf-field vf-field-password form-group">
		<input type="password" :class="getForm().option('fieldClass')" v-model="curValue" :placeholder="label">
		<span class="label label-danger" v-if="error !== false">{{ error }}</span>
	</div>
</template>

<script>
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
				return this.curValue;
			},
			setValue: function(value) {
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

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});
		}
	};
</script>
