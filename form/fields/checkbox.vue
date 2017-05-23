<template>
	<div class="vf-field-checkbox-wrapper">
		<div class="vf-field vf-field-checkbox">
			<div :class="['checkbox-check', {'active': curValue === true}]" @click="toggle">
				<span v-if="curValue === true" class="fa fa-check"></span>
			</div>
			<span class="checkbox-label" @click.self="toggle">{{ label }}</span>
		</div>
		<div v-if="error !== false">
			<span class="label label-danger" >{{ error }}</span>
		</div>
	</div>
</template>

<style lang="less">
	.vf-field-checkbox-wrapper {
		margin-bottom: 15px;
	}
	.vf-field-checkbox {
		.checkbox-check {
			display: inline-block;
    		text-align: center;
			vertical-align: middle;
			margin: 0;
			padding: 0;
			width: 22px;
			height: 22px;
			cursor: pointer;
			border: #666666 solid 1px;
			&:hover {
				border: #FE881D solid 1px;
    			box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(254, 136, 29, 0.6);
			}
			&.active {
				background-color: #FE881D;
			}
			&.active:hover {
				border-color: #FE881D;
			}
			span {
				color: white;
			}
		}
		input {
			visibility: hidden;
		}
		min-height: 10px;
		.checkbox-label {
			cursor: pointer;
			opacity: 0.9;
			&:hover {
				opacity: 1;
			}
		}
	}
</style>

<script>
	require('font-awesome-webpack');

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
				default: false,
				type: Boolean
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			toggle: function() {
				this.curValue = !this.curValue;
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
				curValue: '' ,
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
