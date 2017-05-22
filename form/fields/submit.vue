<template>
	<div class="vf-field vf-field-submit form-group">
		<button type="submit" class="btn btn-primary btn-submit"><slot>{{ label }}</slot></button>
	</div>
</template>

<script>
	export default {
		computed: {
			label: function() {
				return this.getForm().option('submitLabel');
			}
		},
		methods: {
			getForm: require('../methods/get-form.js'),
		}
	};
</script>
