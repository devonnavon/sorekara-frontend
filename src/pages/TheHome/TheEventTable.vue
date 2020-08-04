<template>
	<!-- <vuetable
			ref="vuetable"
			:api-mode="false"
			:fields="fields"
			:data-manager="dataManager"
			:css="css.table"
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
		 -->

	<!-- <body class="flex items-center justify-center">
		<div class="container">
			<table
				class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
			>
				<thead class="">
					<tr
						class="bg-orange text-white flex flex-col flex-no wrap sm:bg-white sm:text-orange sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
					>
						<th class="p-3 text-left text-opacity-60 hover:text-opacity-100">
							TITLE
						</th>
						<th class="p-3 text-left">DESCRIPTION</th>
						<th class="p-3 text-left">EVENT DATE</th>
						<th class="p-3 text-left">PASSWORD</th>
					</tr>
				</thead>
				<tbody class="flex-1 sm:flex-none border-t-0">
					<tr
						class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border-b-2 border-t-2 border-orange"
					>
						<td class="border-grey-light border hover:bg-gray-100 p-3">
							Sample title name
						</td>
						<td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</td>
						<td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
							2020-07-27
						</td>
						<td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
							password
						</td>
					</tr>
				</tbody>
			</table>
		</div> -->

	<!--                               -->
	<table class="border-collapse w-full">
		<thead>
			<tr>
				<th
					class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
				>
					TITLE
				</th>
				<th
					class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
				>
					DESCRIPTION
				</th>
				<th
					class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
				>
					EVENT DATE
				</th>
				<th
					class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
				>
					PASSWORD
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
			>
				<td
					class="w-full lg:w-auto p-3 text-base text-orange text-left text-center border border-b block lg:text-left lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>TITLE</span
					>
					KnobHome
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>DESCRIPTION</span
					>
					German
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>EVENT DATE</span
					>
					<span class="rounded bg-red-400 py-1 px-3 text-xs font-bold"
						>deleted</span
					>
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>PASSWORD</span
					>
					<span class="rounded bg-red-400 py-1 px-3 text-xs font-bold">yo</span>
				</td>
			</tr>
			<tr
				class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
			>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Company name</span
					>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Country</span
					>
					Schweden
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Status</span
					>
					<span class="rounded bg-green-400 py-1 px-3 text-xs font-bold"
						>active</span
					>
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Actions</span
					>
					<a href="#" class="text-blue-400 hover:text-blue-600 underline"
						>Edit</a
					>
					<a href="#" class="text-blue-400 hover:text-blue-600 underline pl-6"
						>Remove</a
					>
				</td>
			</tr>
			<tr
				class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
			>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Company name</span
					>
					ghome
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Country</span
					>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Status</span
					>
					<span class="rounded bg-yellow-400 py-1 px-3 text-xs font-bold"
						>inactive</span
					>
				</td>
				<td
					class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
						>Actions</span
					>
					<a href="#" class="text-blue-400 hover:text-blue-600 underline"
						>Edit</a
					>
					<a href="#" class="text-blue-400 hover:text-blue-600 underline pl-6"
						>Remove</a
					>
				</td>
			</tr>
		</tbody>
	</table>
	<!-- </body> -->
</template>

<script>
import Vuetable from 'vuetable-2';
import FieldsDef from './FieldsDef.js';
import axios from 'axios';
import _ from 'lodash';
import TableCSS from './TableCSS.js';

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
					eventDate: new Date(11111123),
					published: true,
					password: 'yes',
				},
				{
					id: 3,
					title: 'xxxporn',
					description:
						'people might do this on our site also. that would be funny, and probably quite lucrative',
					eventDate: new Date(20200101),
					published: false,
					password: 'xxx',
				},
				{
					id: 4,
					title: 'plant care and you',
					description:
						'have you gotten a new plant? okay here is something for you',
					eventDate: new Date(20210302),
					published: false,
					password: 'plant',
				},
			],
			css: TableCSS,
		};
	},

	watch: {
		data(newVal, oldVal) {
			this.$refs.vuetable.refresh();
		},
	},

	mounted() {
		// axios.get('https://vuetable.ratiw.net/api/users').then((response) => {
		// 	this.data = response.data.data;
		// });
		// console.log(this.data);
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

<style></style>
