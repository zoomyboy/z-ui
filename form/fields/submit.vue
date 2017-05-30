<template>
	<button type="submit" class="btn btn-primary btn-submit vf-field vf-field-submit" @click="setValues()"><slot>{{ label }}</slot></button>
</template>

<style lang="less">
	@import '~uiStyle';
	@import '~bootstrap/less/mixins/buttons.less';

	.vf-field.vf-field-submit {
		.button-variant(@button-color, @button-bg, @button-border);
	}
</style>

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
