<template>
	<div v-if="count() > 0" :class="['formStatusBar', {'container-fluid': container === true}]">
		<ul v-for="status in statuses" :class="'alert alert-'+status" v-if="count(status) > 0">
			<li v-for="message in messages[status]" v-html="message"></li>
		</ul>
	</div>
</template>

<style lang="less">
	.formStatusBar {
		ul {
			list-style-type: none;
		}
	}
</style>

<script>
	module.exports = {
		data: ()=> {
			return {
				messages: {
					info: [],
					success: [],
					warning: [],
					danger: []
				},
				status:'success',
				statuses: ['info', 'warning', 'danger', 'success'],
				activeTimeout: false
			}
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
			}
		},
		methods: {
			_setMessages: function (messages, status) {
				var vm = this;

				if (this.activeTimeout != false) {
					vm.clear();
					window.clearTimeout(this.activeTimeout);
				}

				if (typeof messages == 'string') {
					messages = [messages];
				}

				this.messages[status] = messages;

				this.activeTimeout = window.setTimeout(function() {
					vm.clear();
				}, vm.hideAfter);
			},
			clear() {
				if (this.activeTimeout != false) {
					window.clearTimeout(this.activeTimeout);
				}

				this.messages = {
					info: [],
					success: [],
					warning: [],
					danger: []
				};

				this.$events.fire('statusbarcleared', this);
			},
			count: function(status) {
				if (status == undefined) {
					return this.messages.info.length + this.messages.success.length + this.messages.warning.length + this.messages.danger.length;
				}

				if (typeof this.messages[status] === 'string') {
					return 1;
				}

				return this.messages[status].length;
			},
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
