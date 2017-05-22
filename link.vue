<template>
	<router-link :to="href" :class="['btn', 'btn-'+this.type, 'btn-'+this.size]"><span :class="['fa', 'fa-'+this.icon]"></span></router-link>
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
				default: 'sm'
			},
			href: {
				required: true,
				type: String,
				default: ''
			},
			icon: {
				required: false,
				type: String,
				default: ''
			}
		}
	};
</script>
