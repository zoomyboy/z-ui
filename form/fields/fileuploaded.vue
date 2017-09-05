<template>
	<div class="vf-field-child vf-field-file-child">
		<img :src="data.url" ref="preview" class="preview img-responsive">
		<span title="Löschen" @click="del" class="delete-button fa fa-close"></span>
		<slot></slot>
	</div>
</template>

<style lang="less">
	.vf-field-child.vf-field-file-child {
		position: relative;
		.delete-button {
			position: absolute;
			top: 0;
			right: 0;
			margin-top: 14px;
			margin-right: 14px;
			font-size: 20px;
			color: white;
			cursor: pointer;
		}
		.preview {
			margin-bottom: 8px;
		}
	}
</style>

<script>
	export default {
		data: function() {
			return  {
			};
		},
		props: {
			data: {
				required: true
			},
			k: {
				required: true
			}
		},
		methods: {
			del: function() {
				this.$emit('deleteuploaded', this.data);
			}
		},
		mounted: function() {
			var vm = this;

			this.$children.forEach(function(field) {
				if (field.isField) {
					field.$on('change', function(newVal) {
						vm.data[field.name] = newVal;
					});
				}
			});
		}
	}
</script>
