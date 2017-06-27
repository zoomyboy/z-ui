<template>
	<div class="dropdown" ref="container">
		<div class="dropdown-toggle" type="button" data-toggle="dropdown">
			{{ realTitle }} <span :class="['fa', caret]"></span>
		</div>
		<ul class="dropdown-menu">
			<slot></slot>
		</ul>
	</div>
</template>

<style lang="less">

</style>

<script>
	require('font-awesome-webpack');

	export default {
		data: function() {
			return {
				open: false,
				customTitle: false
			};
		},
		props: {
			title: {
				default: ''
			}
		},
		computed: {
			caret: function() {
				return (this.open) ? 'fa-angle-up' : 'fa-angle-down';
			},
			realTitle: function() {
				return (this.customTitle) ? this.customTitle : this.title;
			}
		},
		mounted: function() {
			var vm = this;

			$(this.$refs.container).on('shown.bs.dropdown', function() {
				vm.open = true;
			});

			$(this.$refs.container).on('hidden.bs.dropdown', function() {
				vm.open = false;
			});
		}
	}
</script>
