<template>
	<div class="cp-w-child" :class="{'hidden': !this.active, 'container-fluid': container === true || containerForeign === true}">
		<slot></slot>
	</div>
</template>

<style lang="less">
	.cp-wizard {
		&.hidden {
			display: none;
		}
	}
</style>

<script>
	module.exports = {
		data: function() {
			return {
				active: 0,
				isWChild: true,
				containerForeign: false
			};
		},
		props: {
			title: {
				type: String,
				required: true
			},
			index: {
				type: String,
				required: true
			},
			visible: {
				type: Boolean,
				required: false,
				default: false
			},
			container: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		mounted: function() {
			var vm = this;

			this.active = this.visible;
			vm.$on('changestate', function(title, state) {
				if (title == vm.title) {
					vm.active = state;
				}
			});

			vm.$events.listen('set-w-child-container', function() {
				vm.containerForeign = true;
			});
		}
	};
</script>
