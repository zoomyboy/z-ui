<template>
	<div class="vf-field-select-wrapper">
		<span class="select-label">{{ label }}</span>
		<div>
			<select class="vf-field-select" ref="selectField"  data-minimum-results-for-search="Infinity">
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
	@import "~uiStyle";

	.vf-field-select-wrapper {
		margin-bottom: 15px;
		.select-label {
			font-weight: bold;
		}
		& *:focus {
			outline: none !important;
			-webkit-appearance: none;
		}
	}

	.select2-search.select2-search--dropdown {
		&:focus, & > input:focus {
			outline: none !important;
			-webkit-appearance: none;
		}
	}

	.select2.select2-container.select2-container--default {
		display: block;
		width: 100% !important;
	}
	span.selection > .select2-selection.select2-selection--single {
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		border-radius: 4px;
		border-color: @field-border-color;
		height: @field-height;
		padding: @field-padding;
		.select2-selection__arrow {
			height: @field-height;
			position: absolute;
			top: 0px;
			right: 0px;
			width: 20px;
		}
		.select2-selection__rendered {
			line-height: @field-height - (@field-padding-v + @field-border-strength) * 2;
			padding: 0;
		}
	}
	span.select2-dropdown {
		border-color: @field-focus;
		outline: 0;
		box-shadow: inset 0 0px 1px darken(#000000, 5%), 0 0 8px fade(@field-focus, 40%);
	}

	span.select2-container--focus, span.select2-container--open {
		span.selection > .select2-selection.select2-selection--single  {
			border-color: @field-focus;
			outline: 0;
			box-shadow: inset 0 0px 1px darken(#000000, 5%), 0 0 8px fade(@field-focus, 40%);
		}
	}
	
	.select2-container--default .select2-results__option.select2-results__option--highlighted {
		background-color: @select-dropdown-hover;
		color: @select-dropdown-color;
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
				default: null,
			},
			min: {
				required: false,
				default: 0
			},
			max: {
				required: true
			},
			placeholder: {
				type: String,
				default: ''
			},
			allownull: {
				default: false,
				type: Boolean
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setOptions(select) {
				var vm = this;

				if (vm.placeholder) {
					select.select2({placeholder: vm.placeholder, allowClear: vm.allownull});
				} else {
					select.select2({placeholder: '---', allowClear: vm.allownull});
				}
				select.append(`<option></option>`);
				
				vm.options.forEach(function(option) {
					select.append(`<option value="${option.id}">${option.title}</option>`);
				});

				select.trigger('change');

				select.on('select2:select', function() {
					vm.curValue = $(this).val();
				});
				select.on('select2:unselect', function() {
					vm.curValue = null;
				});

				vm.listen();

				return;
			},
			setValue: function(newVal) {
				if (typeof newVal == 'object') {
					this.curValue = newVal.id;
				} else {
					this.curValue = newVal;
				}

				this.$events.fire('vf-range-change', this.name, newVal);
			},
			listen: function() {
				var vm = this;

				this.getForm().requireValue(this.name);
				this.$events.listen('model-loaded', function(form) {
					if (form == vm.getForm()) {
						vm.getForm().requireValue(vm.name);
					}
				}); 
			},
			getForm: require('../methods/get-form.js')
		},
		watch: {
			value: function(newVal) {
				this.setValue(newVal);
			},
			curValue: function(newVal) {
				var vm = this;

				var $select = $(vm.$refs.selectField);
				$select.val(newVal).trigger('change');
				this.$events.fire('vf-range-change', this.name, newVal);
			}
		},
		computed: {
			options: function() {
				var cur = this.min-1;
				var a = new Array(this.max - this.min+1);
				a = a.fill(0, 0, parseInt(this.max) - parseInt(this.min)+1);

				return a.map(function(ind) {
					cur++;
					return {id: cur, title: cur};
				});
			}
		},
		data: function() {
			return {
				isField: true,
				curValue: null,
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

			this.setOptions($select);

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});

		}
	};
</script>
