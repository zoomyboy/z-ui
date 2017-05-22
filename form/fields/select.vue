<template>
	<div class="vf-field-select-wrapper">
		<span class="select-label">{{ label }}</span>
		<div>
			<select class="vf-field-select" ref="selectField">
				<option v-for="(cb, ind) in items" :value="ind" >{{ cb.title }}</option>
			</select>
		</div>
		<div v-if="error !== false">
			<span class="label label-danger" >{{ error }}</span>
		</div>
	</div>
</template>

<style lang="less">
	@import "~select2/dist/css/select2.min.css";

	.vf-field-select-wrapper {
		margin-bottom: 15px;
		.select-label {
			font-weight: bold;
		}
	}
	.select2.select2-container.select2-container--default {
		display: block;
		width: 100% !important;
	}
</style>

<script>
	require('font-awesome-webpack');
	require('select2');

	export default {
		props: {
			label: {
				default: '&nbsp;',
				required: false
			},
			name: {
				required: true,
			},
			value: {
				default: function() {return null;},
			},
			url: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: ''
			},
			allowNull: {
				default: false,
				type: Boolean
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
		},
		watch: {
			value: function(newVal) {
				if (typeof newVal == 'object') {
					this.curValue = newVal.id;
				}

				this.curValue = newVal;
			}
		},
		data: function() {
			return {
				isField: true,
				curValue: function() {return null;},
				error: false,
				items: false
			}
		},
		mounted: function() {
			var vm = this;

			if (typeof this.value == "object" && this.value != null) {
				this.curValue = this.value.map(function(item) {
					if (typeof item == 'object') {
						return item.id;
					}

					return item;
				});
			}
			
			var $select = $(vm.$refs.selectField);
			var $option = $('<option></option>');

			var options = {};
			if (this.placeholder != '') {
				options.placeholder = 'Loading...';
			}			
			$select.select2(options);

			axios.get(vm.url).then(function(ret) {
				if (!vm.allowNull) {
					$select.select2({placeholder: vm.placeholder});
					$select.append(`<option></option>`);
				}
				ret.data.forEach(function(item) {
					$select.append(`<option value="${item.id}">${item.title}</option>`);
				});
				$select.trigger('change');
			});

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});
		}
	};
</script>
