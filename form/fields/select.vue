<template>
	<div class="vf-field-select-wrapper">
		<span class="select-label">{{ label }}</span>
		<div>
			<select class="vf-field-select" ref="selectField">
				<option v-for="(cb, ind) in items" :value="ind" >{{ cb.valueprop }}</option>
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
			color: @field-label-color;
			margin-bottom: 5px;
			display: block;
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
			.select2-selection__clear {
				font-size: 22px;
				margin-right: 5px;
			}
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
			url: {
				type: String,
				required: false,
				default: ''
			},
			options: {
				type: Array,
				default: function() {return [];}
			},
			placeholder: {
				type: String,
				default: ''
			},
			nullable: {
				default: false,
				type: Boolean
			},
			valuetitle: {
				default: undefined,
				type: String,
				required: false
			},
			valueurl: {
				default: undefined,
				type: String,
				required: false
			},
			idprop: {
				default: 'id',
				type: String,
				required: false
			},
			valueprop: {
				default: 'title',
				type: String,
				required: false
			},
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setOptions(select) {
				var vm = this;

				if (vm.placeholder) {
					select.select2({placeholder: vm.placeholder, allowClear: vm.nullable});
				} else {
					select.select2({placeholder: '---', allowClear: vm.nullable});
				}
				select.append(`<option></option>`);
				
				if (vm.url == '') {
					//Options is set - get options from options prop
					vm.options.forEach(function(option) {
						select.append(`<option value="${option[vm.idprop]}">${option[vm.valueprop]}</option>`);
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
				}

				//Url is set - Get options from that url
				axios.get(vm.url).then(function(ret) {
					ret.data.forEach(function(item) {
						select.append(`<option value="${item[vm.idprop]}">${item[vm.valueprop]}</option>`);
					});
					select.trigger('change');

					select.on('select2:select', function() {
						vm.curValue = $(this).val();
					});
					select.on('select2:unselect', function() {
						vm.curValue = null;
					});

					if (vm.valuetitle) {
						ret.data.forEach(function(item) {
							if (item[vm.valueprop] == vm.valuetitle) {
								vm.curValue = item[vm.idprop];
							}
						});
					}
					if (vm.valueurl) {
						axios.get(vm.valueurl).then(function(defaultret) {
							if (defaultret.data[vm.idprop] != undefined) {
								vm.curValue = defaultret.data[vm.idprop];
							}
						});
					}

					vm.listen();
				});
			},
			setValue: function(newVal, oldVal) {
				if (typeof newVal == 'object') {
					this.curValue = newVal.id;
				} else {
					this.curValue = newVal;
				}

				this.$events.fire('vf-select-change', this.name, newVal);
				this.$events.fire('vf-select-change-'+this.name, newVal, oldVal);
			},
			listen: function() {
				var vm = this;

				if (vm.value) {
					vm.curValue = vm.value;
				}

				if (!this.getForm()) {return;}

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
			curValue: function(newVal, oldVal) {
				var vm = this;

				var $select = $(vm.$refs.selectField);
				$select.val(newVal).trigger('change');
				this.$events.fire('vf-select-change', this.name, newVal);
				this.$events.fire('vf-select-change-'+this.name, newVal, oldVal);
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
						return item[idprop];
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
