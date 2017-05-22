<template>
	<div id="page-heading" :class="['clearfix', {'line': line === true, 'small': small === true}]">
		<div class="col-xs-12">
			<div class="title" v-if="innerTitle != ''">
				{{ innerTitle }}
			</div>
			<div class="subtitle" v-if="innerSubtitle != ''">
				{{ innerSubtitle }}
			</div>
		</div>
	</div>
</template>

<style lang="less">
	#page-heading {
		margin-bottom: 10px;
		position: relative;
		background: rgba(252,252,252,.89);
		padding-top: 20px;
		padding-bottom: 20px;
		.title {
			font-size: 18px;
			font-weight: 700;
			color: #414C59;
		}
		.subtitle {
			opacity: .6;
			font-size: 13px;
		}
		&.line {
			border-bottom: #eeeeee solid 1px;
		}
		&.small {
			padding-bottom: 7px;
			padding-top: 7px;
		}
	}
</style>

<script>
	module.exports = {
		props: {
			title: {
				default: ''
			},
			subtitle: {
				default: ''
			},
			line: {
				default: false,
				type: Boolean
			},
			small: {
				type: Boolean,
				default: false
			}
		},
		data: function() {
			return {
				innerTitle: '',
				innerSubtitle: ''
			};
		},
		mounted: function() {
			var vm = this;

			vm.$events.listen('set-heading', function(heading) {
				vm.innerTitle = heading;
			});
			vm.$events.listen('set-subheading', function(subheading) {
				vm.innerSubtitle = subheading;
			});
		}
	};
</script>
