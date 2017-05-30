<template>
	<div class="vf-field-checkboxes-wrapper">
		<span class="checkboxes-label">{{ label }}</span>
		<div class="vf-field-checkboxes" v-for="(cb, ind) in items">
			<div :class="['checkboxes-check', {'active': isActive(ind)}]" @click="toggle(ind)">
				<span v-if="isActive(ind)" class="fa fa-check"></span>
			</div>
			<span class="checkbox-label" @click.self="toggle(ind)">{{ cb.title }}</span>
		</div>
		<div v-if="error !== false">
			<span class="label label-danger" >{{ error }}</span>
		</div>
	</div>
</template>

<style lang="less">
	@import '~uiStyle';

	.vf-field-checkboxes-wrapper {
		margin-bottom: 15px;
		.checkboxes-label {
			font-weight: bold;
		}
	}
	.vf-field-checkboxes {
		margin: 3px 0;
		.checkboxes-check {
			display: inline-block;
    		text-align: center;
			vertical-align: middle;
			margin: 0;
			padding: 0;
			width: 22px;
			height: 22px;
			cursor: pointer;
			border: @checkbox-border;
			&:hover {
				border: @checkbox-border-hover;
				box-shadow: inset 0 0px 1px darken(#000000, 5%), 0 0 8px fade(@checkbox-bg, 40%);
			}
			&.active {
				background-color: @checkbox-bg;
			}
			&.active:hover {
				border-color: @checkbox-bg;
			}
			span {
				color: @checkbox-color;
			}
		}
		.checkbox-label {
			cursor: pointer;
			opacity: 0.9;
			&:hover {
				opacity: 1;
			}
		}
		input {
			visibility: hidden;
		}
		min-height: 10px;

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
				default: function() {return [];},
				type: Array
			},
			url: {
				type: String,
				required: true
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setValue: function(newVal) {
				this.curValue = newVal.map(function(item) {
					if (typeof item == 'object') {
						return item.id;
					}

					return item;
				});
			},
			toggle: function(ind) {
				var vm = this;
				var item = this.items[ind];

				if (this.isActive(ind)) {
					this.curValue = this.curValue.filter(function(c) {
						return c != item.id;
					});
				} else {
					this.curValue.push(item.id);
				}
			},
			isActive: function(ind) {
				var item = this.items[ind];
				return this.curValue.find(function(c) {
					return c == item.id;
				}) != undefined;
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
				curValue: function() {return [];},
				error: false,
				items: false
			}
		},
		mounted: function() {
			var vm = this;

			this.curValue = this.value.map(function(item) {
				if (typeof item == 'object') {
					return item.id;
				}

				return item;
			});

			axios.get(this.url).then(function(res) {
				vm.items = res.data;
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
