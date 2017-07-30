<template>
	<div class="vf-field vf-field-textarea form-group">
		<label v-if="getForm().option('showLabel')" for="">{{ label }}</label>

		<p v-if="description">{{ description }}</p>
		<textarea :class="[getForm().option('fieldClass'), {'ckeditor': realCkeditor}]" v-model="curValue" :placeholder="label" ref="ta"></textarea>

		<div v-if="help != ''">
			<span class="fa fa-question input-help" data-toggle="tooltip" data-original-title="" :title="help"></span>
		</div>
		<div v-if="info != ''">
			<span class="fa fa-info input-info" data-toggle="tooltip" data-original-title="" :title="info"></span>
		</div>

		<span class="label label-danger" v-if="error !== false">{{ error }}</span>
	</div>
</template>

<style lang="less">
	@import '~uiStyle';
	.vf-field-textarea {
		textarea {
			.field-focus(@field-focus);
		}
		label {
			color: @field-label-color;
		}
	}
</style>

<script>
	require('bootstrap');

	export default {
		props: {
			label: {
				default: false,
				required: false
			},
			name: {
				required: true,
			},
			value: {
				default: '',
				type: String
			},
			help: {
				required: false,
				default: '',
				type: String
			},
			info: {
				required: false,
				default: '',
				type: String
			},
			ckeditor: {
				default: false,
				type: Boolean
			},
			description: {
				default: ''
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setValue: function(newVal) {
				this.curValue = newVal;
			},
			getForm: require('../methods/get-form.js')
		},
		watch: {
			value: function(newVal) {
				this.setValue(newVal);
			}
		},
		computed: {
			hasAddons: function() {
				return this.help != '' || this.info != '';
			},
			realCkeditor: function() {
				return this.ckeditor || this.getForm().option('ckeditor');
			},
			id: function() {
				return Math.random().toString(36).replace(/[^a-z]+/g, '')
				+ Math.random().toString(36).replace(/[^a-z]+/g, '');
			}
		},
		data: function() {
			return {
				isField: true,
				curValue: '',
				error: false
			}
		},
		mounted: function() {
			var vm = this;
			this.curValue = this.value;

			this.$events.listen('model-loaded', function(form) {
				if (form == vm.getForm()) {
					vm.getForm().requireValue(vm.name);
				}
			});

			var vm = this;

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});

			$(this.$refs.addon).find('.input-help').tooltip();
			$(this.$refs.addon).find('.input-info').tooltip();

			if (this.realCkeditor) {
				var id = this.id;

				$(this.$refs.ta).attr('id', id);

				var ck = window.CKEDITOR.replace(id);
				ck.on('change', function() {
					ck.updateElement();
					$('#'+id).trigger('change');
					vm.setValue($('#'+id).val());
				});
			}
		}
	};
</script>
