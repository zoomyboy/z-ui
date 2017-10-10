<template>
	<table :class="['table', 'table-striped', {'table-bordered': border}]">
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
				<td v-for="heading in parsedHeadings" v-html="parse(getData(row, heading), heading)"></td>
				<td v-if="!noactions" class="action-cell">
					<vf-form :msg="deletemsg" :action="'/api/'+controller+'/'+row.id" method="delete" ajax confirm="Wollen Sie diesen Eintrag wirklich löschen?">
						<buttonbar :margin="false">
							<v-link
								v-for="(action,ind) in actions"
								:key="ind"
								v-on:event="triggerActionEvent(row, action)"
								:event="action.event"
								:href="row[action.href]"
								:icon="action.icon"
								:target="(action.target) ? action.target : '_SELF'"
								:route="action.route"
								:model="row"
							></v-link>
							<v-link :route="controller+'.edit'" icon="pencil" :model="row"></v-link>
							<vf-submit  icon="trash" size="xs" name="id" :value="row.id" v-if="deleteaction"><span class="fa fa-trash"></span></vf-submit>
						</buttonbar>
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
	var defaultOptions = require('./table/options/options.js').default;
	window.globalTableOptions = (window.globalTableOptions == undefined) ? {} : window.globalTableOptions;
	var merge = require('merge');

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
			},
			options: {
				default: function() {return {};},
				type: Object
			},
			actions: {
				default: function() {return [];}
			},
			deleteaction: {
				type: Boolean,
				default: true
			},
			border: {
				type: Boolean,
				default: true
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
			},
			opts: function() {	
 				let options = merge.recursive(defaultOptions(), window.globalTableOptions);
 				return merge.recursive(options, this.options);
			},
		},
		methods: {
			getData: require('./table/m_get-data.js').default,
			getTable: function() {
				var getTable = require('./table/m_get-table.js');
				return getTable(this);
			},
			parse: function(value, heading) {
				var parse = require('./table/m_parse.js').default;
				return parse(value, heading, this);
			},
			triggerActionEvent: function(row, action) {
				this.$emit(action.event, row, action);
			}
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
