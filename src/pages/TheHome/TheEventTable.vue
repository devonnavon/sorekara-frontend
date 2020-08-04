<template>
	<div id="app" class="ui container">
		<vuetable
			ref="vuetable"
			:api-mode="false"
			:fields="fields"
			:data-manager="dataManager"
		>
			<div slot="actions" slot-scope="props">
				<button
					class="ui small button"
					@click="onActionClicked('view-item', props.rowData)"
				>
					<i class="zoom icon"></i>
				</button>
				<button
					class="ui small button"
					@click="onActionClicked('edit-item', props.rowData)"
				>
					<i class="edit icon"></i>
				</button>
				<button
					class="ui small button"
					@click="onActionClicked('delete-item', props.rowData)"
				>
					<i class="delete icon"></i>
				</button>
			</div>
		</vuetable>
		<div style="padding-top:10px"></div>
	</div>
</template>

<script>
import Vuetable from 'vuetable-2';
import FieldsDef from './FieldsDef.js';
import axios from 'axios';
import _ from 'lodash';

export default {
	name: 'TheEventTable',
	components: {
		Vuetable,
	},
	data() {
		return {
			fields: FieldsDef,
			data: [
				{
					id: 1,
					title: 'my super sick concert',
					description:
						'its gonna be cool, we wont touch, no germs etc. gOOd vIBes onLY',
					eventDate: new Date(),
					published: false,
					password: 'password',
				},
				{
					id: 2,
					title: 'super serious meditation',
					description:
						"we're gonna mediate and grow. Its suppppppper serious. We'll be manifesting.",
					eventDate: new Date(),
					published: true,
					password: 'yes',
				},
				{
					id: 3,
					title: 'xxxporn',
					description:
						'people might do this on our site also. that would be funny, and probably quite lucrative',
					eventDate: new Date(),
					published: false,
					password: 'xxx',
				},
				{
					id: 4,
					title: 'plant care and you',
					description:
						'have you gotten a new plant? okay here is something for you',
					eventDate: new Date(),
					published: false,
					password: 'plant',
				},
			],
		};
	},

	watch: {
		data(newVal, oldVal) {
			this.$refs.vuetable.refresh();
		},
	},

	mounted() {
		axios.get('https://vuetable.ratiw.net/api/users').then((response) => {
			this.data = response.data.data;
		});
		console.log(this.data);
	},

	methods: {
		onPaginationData(paginationData) {
			this.$refs.pagination.setPaginationData(paginationData);
		},
		onChangePage(page) {
			this.$refs.vuetable.changePage(page);
		},
		dataManager(sortOrder) {
			if (this.data.length < 1) return;

			let local = this.data;

			// sortOrder can be empty, so we have to check for that as well
			if (sortOrder.length > 0) {
				console.log('orderBy:', sortOrder[0].sortField, sortOrder[0].direction);
				local = _.orderBy(
					local,
					sortOrder[0].sortField,
					sortOrder[0].direction
				);
			}

			return {
				data: _.slice(local),
			};
		},
		onActionClicked(action, data) {
			console.log('slot actions: on-click', data.name);
		},
	},
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 20px;
}
button.ui.button {
	padding: 8px 3px 8px 10px;
	margin-top: 1px;
	margin-bottom: 1px;
}
</style>
