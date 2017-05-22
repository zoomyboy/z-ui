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
	@import "../../ui.less";

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
		border-radius: 0;
		border-color: @borders2;
		height: 40px;
		padding: 10px 15px;
		.select2-selection__arrow {
			height: 40px;
			position: absolute;
			top: 0px;
			right: 0px;
			width: 20px;
		}
		.select2-selection__rendered {
			line-height: 20px;
			padding: 0;
		}
	}
	span.select2-dropdown {
		border-color: #FE881D;
		outline: 0;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(254, 136, 29, 0.6);
	}

	span.select2-container--focus, span.select2-container--open {
		span.selection > .select2-selection.select2-selection--single  {
			border-color: #FE881D;
			outline: 0;
			box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(254, 136, 29, 0.6);
		}
	}
	
	.select2-container--default .select2-results__option.select2-results__option--highlighted {
		background-color: @bg-very-bright;
		color: @link-bright;
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
				} else {
					this.curValue = newVal;
				}
			},
			curValue: function(newVal) {
				var vm = this;
				if (typeof newVal == 'number') {
					var $select = $(vm.$refs.selectField);
					$select.val(newVal).trigger('change');
				}
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

			axios.get(vm.url).then(function(ret) {
				if (!vm.allowNull) {
					$select.select2({placeholder: vm.placeholder});
					$select.append(`<option></option>`);
				}
				ret.data.forEach(function(item) {
					$select.append(`<option value="${item.id}">${item.title}</option>`);
				});
				$select.trigger('change');

				$select.on('select2:select', function() {
					vm.curValue = $(this).val();
				});
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