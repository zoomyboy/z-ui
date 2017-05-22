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
	.vf-field-checkboxes-wrapper {
		margin-bottom: 15px;
		.checkboxes-label {
			font-weight: bold;
		}
	}
	.vf-field-checkboxes {
		.checkboxes-check {
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
			}
		},
		watch: {
			value: function(newVal) {
				this.curValue = newVal.map(function(item) {
					if (typeof item == 'object') {
						return item.id;
					}

					return item;
				});
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
