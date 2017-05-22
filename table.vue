<template>
	<table class="table table-bordered table-striped">
		<thead>
			<tr> 
				<th v-for="heading in parsedHeadings">
					{{ heading.title }}
				</th>
				<th v-if="!noactions">
					Aktion
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in data">
				<td v-for="heading in parsedHeadings">
					{{ getData(row, heading.data) }}
				</td>
				<td v-if="!noactions" class="action-cell">
					<v-link :href="'/'+controller+'/'+row.id+'/edit'" icon="pencil" size="xs"></v-link>
					<vf-form :msg="deletemsg" :action="'/api/'+controller+'/'+row.id" method="delete" ajax confirm="Wollen Sie diesen Eintrag wirklick löschen?">
						<vf-submit  icon="trash" size="xs"><span class="fa fa-trash"></span></vf-submit>
					</vf-form>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="less">
	.action-cell {
		form {
			display: inline;	
		}
		.vf-field {
			display: inline;
		}
	}
</style>

<script>
	module.exports = {
		data: function() {
			return {
				data: [],
				isTable: true
			};
		},
		props: {
			headings: {
				required: true
			},
			noactions: {
				type: Boolean,
				default: false
			},
			url: {
				required: true,
				type: String
			},
			controller: {
				required: true,
				type: String
			},
			deletemsg: {
				required: false,
				type: String,
				default: ''
			}
		},
		computed: {
			parsedHeadings: function() {
				if (typeof this.headings == 'string') {
					return this.headings.split('|').map(function(heading) {
						data = {};
						data['title'] = heading;
						data['data'] = heading.toLowerCase();
						return data;
					});	
				}

				if (typeof this.headings == 'object') {
					return this.headings;
				}
			}	
		},
		methods: {
			getData: require('./table/m_get-data.js').default
		},
		mounted: function() {
			var vm = this;

			axios.get(this.url).then(function(ret) {
				vm.data = ret.data;
			});

			this.$on('row-deleted', function(data) {
				if (data.hasOwnProperty('url')) {
					var localId = data.url.replace('/api', '').replace('/'+vm.controller+'/', '');

					vm.data = vm.data.filter(function(child) {
						return child.id != localId;
					});
				}
			});
		}
	};
</script>
