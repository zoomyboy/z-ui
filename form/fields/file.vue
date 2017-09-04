<template>
	<div ref="wrapper" class="vf-field vf-field-file form-group">
		<label v-if="getForm().option('showLabel')" for="">{{ label }}</label>

		<div class="row">
			<div class="col-sm-4" v-for="(file, ind) in curValue">
				<fileuploaded :k="ind" v-on:deleteuploaded="deleteuploaded" :data="file"></fileuploaded>
			</div>
			<div class="col-sm-4" v-for="(file, ind) in queue">
				<filepreview :k="ind" v-on:deletepreview="deletepreview" :data="file"></filepreview>
			</div>
		</div>
		<div class="clearfix">
			<div class="btn-group">
				<label class="btn btn-default btn-file">
					Browse <input @change="processFiles" ref="input" type="file" :class="getForm().option('fieldClass')" style="display: none;" multiple>
				</label>
				<div v-if="queue.length != 0" @click="upload" class="btn btn-primary">Upload</div>
			</div>
		</div>

		<span class="label label-danger" v-if="error !== false">{{ error }}</span>
	</div>
</template>

<style lang="less">
	//@import '~uiStyle';
</style>

<script>
	export default {
		data: function() {
			return {
				isField: true,
				curValue: [],
				error: false,
				queue: []
			}
		},
		props: {
			label: {
				default: false,
				required: false
			},
			name: {
				required: true,
			},
			value: {
				default: function() {
					return [];
				},
				type: Array
			},
			uploadurl: {
				required: false,
				default: '/api/file',
				type: String
			}
		},
		methods: {
			getValue: function() {
				return this.curValue;
			},
			setValue: function(newVal, oldVal) {
				this.curValue = newVal;
			},
			getForm: require('../methods/get-form.js'),
			processFiles: function() {
				for (var i = 0, f; f = this.$refs.input.files[i]; i++) {
					this.queue.push({uuid: Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5), data: f});
				}
			},
			upload: function() {
				var vm = this;

				vm.queue.forEach(function(file, index) {
					var data = new FormData();
					data.append('files', file.data, file.data.fileName);
					axios.post(vm.uploadurl, data, {
						headers: {
							'accept': 'application/json',
							'Content-Type': 'multipart/form-data'
						}
					}).then(function(res) {
						vm.curValue.push(res.data);
						vm.queue = vm.queue.filter(function(f) {
							return file.uuid != f.uuid;
						});
					});
				});
			},
			deleteuploaded: function(data) {
				var vm = this;

				axios.post('/api/file/'+data.id, {'_method': 'delete'}).then(function(ret) {
					vm.curValue = vm.curValue.filter(function(file) {
						console.log(file);
						return data.id != file.id;
					});
				});
			},
			deletepreview: function(file) {
				this.queue = this.queue.filter(function(f) {
					return f.uuid != file.uuid;
				});
			}
		},
		watch: {
			value: function(newVal) {
				this.setValue(newVal);
			}
		},
		components: {
			filepreview: require('./filepreview.vue'),
			fileuploaded: require('./fileuploaded.vue')
		},
		mounted: function() {
			var vm = this;

			this.curValue = this.value;

			this.$events.listen('model-loaded', function(form) {
				if (form == vm.getForm()) {
					vm.getForm().requireValue(vm.name);
				}
			});

			this.$on('parseError', function(error) {
				vm.error = error;
			});

			vm.$events.listen('cleanFormErrors', function(error) {
				vm.error = false;
			});
		}
	};
</script>
