<template>
	<div class="vf-field-child vf-field-file-child">
		<img ref="preview" class="preview img-responsive">
		<span title="Löschen" @click="del" class="delete-button fa fa-close"></span>
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
				unique: ''
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
		watch: {
			data: function() {
				this.update();
			}
		},
		methods: {
			update: function() {
				var preview = this.$refs.preview;
				var file = this.data.data;
				var reader  = new FileReader();

				reader.addEventListener("load", function () {
					preview.src = reader.result;
				}, false);

				if (file) {
					reader.readAsDataURL(file);
				}
			},
			del: function() {
				this.$emit('deletepreview', this.data);
			}
		},
		mounted: function() {
			this.update();
		}
	}
</script>
