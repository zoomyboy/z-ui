<template>
	<button type="submit" class="btn btn-primary btn-submit" @click="setValues()"><slot>{{ label }}</slot></button>
</template>

<script>
	export default {
		props: {
			confirm: {
				required: false,
				type: String,
				default: ''
			}
		},
		methods: {
			getForm: require('../methods/get-form.js'),
			setValues: function() {
				this.setConfirm();
			},
			setConfirm: function() {
				if (this.confirm) {
					this.getForm().setConfirm(this.confirm);
				} else {
					this.getForm().resetConfirm();
				}
			}
		},
		computed: {
			label: function() {
				return this.getForm().option('submitLabel');
			}
		}
	};
</script>
