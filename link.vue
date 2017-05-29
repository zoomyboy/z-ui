<template>
	<router-link :to="realHref" :class="['btn', 'btn-'+this.type, 'btn-'+this.size]"><span :class="['fa', 'fa-'+this.realIcon]">&nbsp;</span><slot>{{ realLabel }}</slot></router-link>
</template>

<style>

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
			}
		}
	};
</script>
