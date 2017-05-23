<template>
	<div class="vf-field vf-field-text form-group">
		<input type="hidden" v-model="curValue">
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				required: true,
			},
			value: {
				default: '',
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setValue: function(value) {
				this.curValue = value;
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
			this.curValue = this.value;

			var vm = this;
		}
	};
</script>
