<template>
	<div class="vf-field vf-field-text form-group">
		<input type="text" class="form-control" v-model="curValue" :placeholder="label">
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
			}
		},
		watch: {
			value: function(newVal) {
				this.curValue = newVal;
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

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});
		}
	};
</script>
