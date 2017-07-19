<template>
	<div :class="['formStatusBar', {'container-fluid': container === true}, 'layout-'+layout]">
		<transition-group tag="ul" name="statusbaritem">
			<statusbaritem v-for="item in items" :layout="layout" :status="item.status" :messages="item.messages" :key="item" class="statusbaritem-item"></statusbaritem>
		</transition-group>
	</div>
</template>

<style lang="less">
	.formStatusBar {
		&.layout-october {
			position: fixed;
			width: 100%;
			left: 0;
			z-index: 10000;
			display: block;
			top: 20px;
			ul {
				margin: 0 auto;
				max-width: 800px;
				width: 90%;
				list-style-type: none;
				padding-left: 0;
			}
	 	}
	}

	.statusbaritem-item {
		display: block;
		margin-bottom: 10px;
	}
	.statusbaritem-enter-active, .statusbaritem-leave-active {
		transition: opacity 1s, transform 1s;
	}
	.statusbaritem-enter {
		opacity: 0;
		transform: translateY(-20px);
	}
	.statusbaritem-leave-to {
		opacity: 0;
		transform: translateY(20px);
	}
	.statusbaritem-move {
	  transition: transform 1s;
	}
</style>

<script>
	module.exports = {
		data: function() {
			return {
				items: []
			};
		},
		components: {
			'statusbaritem': require('./status-bar-item.vue')
		},
		props: {
			hideAfter: {
				default: 3000,
			},
			container: {
				default: false,
				type: Boolean
			},
			id: {
				default: undefined
			},
			layout: {
				type: String,
				default: 'bootstrap',
				required: false
			}
		},
		methods: {
			_setMessages: function (messages, status, hideAfter) {
				var vm = this;

				if (hideAfter == undefined) {hideAfter = true;}

				var hash = Math.random().toString().slice(2);

				this.items.unshift({status: status, messages: messages, hideAfter: hideAfter, hash: hash});

				if (hideAfter) {
					window.setTimeout(function() {
						vm.items = vm.items.filter(function(item) {
							return item.hash != hash;
						});
					}, vm.hideAfter);
				}
			},
			clear() {
				this.messages = [];
				this.$events.fire('statusbarcleared', this);
			}
		},
		mounted: function() {
			var vm = this;
			vm.$events.listen('messageDanger', function(messages, id) {
				if (vm.id != id) {return;}
				vm._setMessages(messages, 'danger');
			});

			vm.$events.listen('messageSuccess', function(messages, id) {
				if (vm.id != id) {return;}
				vm._setMessages(messages, 'success');
			});
			vm.$events.listen('messageWarning', function(messages, id) {
				if (vm.id != id) {return;}
				vm._setMessages(messages, 'warning');
			});
			vm.$events.listen('messageInfo', function(messages, id) {
				if (vm.id != id) {return;}
				vm._setMessages(messages, 'info');
			});
			vm.$events.listen('messageClear', function(id) {
				if (vm.id != id) {return;}
				vm.clear();
			});
		}
	}
</script>
