<template>
	<router-link v-if="hasRight" :to="realHref" :class="['btn', 'btn-'+this.type, 'btn-'+this.size, 'btn-primary']"><span :class="['fa', 'fa-'+this.realIcon]">&nbsp;</span><slot>{{ realLabel }}</slot></router-link>
</template>

<style lang="less">
	@import '~uiStyle';

	.btn-v-link {
		display: none;
		.btn-group > & {
			display: inline-block;
			float: none;
		}
	}
</style>

<script>
	module.exports = {
		props: {
			type: {
				required: false,
				type: String,
				default: 'primary'
			},
			size: {
				required: false,
				type: String,
				default: 'size-default'
			},
			href: {
				type: String,
				default: ''
			},
			icon: {
				required: false,
				type: String,
				default: ''
			},
			route: {
				type: String,
				default: ''
			},
			add: {
				type: Boolean,
				default: false
			},
			right: {
				default: undefined,
				required: false
			}
		},
		computed: {
			realHref: function() {
				if (this.route) {
					return {name: this.route};
				} else {
					return this.href;
				}
			},
			realLabel: function() {
				if (this.add) {
					return 'Hinzufügen';
				}
			},
			realIcon: function() {
				if (this.add) {
					return 'plus';
				}

				return this.icon;
			},
			hasRight: function() {
				return this.$user == undefined || this.right == undefined || this.$user.hasRight(this.right);
			}
		}
	};
</script>
