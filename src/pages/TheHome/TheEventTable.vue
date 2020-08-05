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
  </div>-->

	<!--                               -->
	<table class="border-collapse w-full font-display">
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
					class="w-full py-6 text-xl lg:w-1/6 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display lg:text-base text-orange font-normal lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>TITLE</span
					>
					KnobHome

					<IconifyIcon
						:icon="icons.settingOutlined"
						class="visible lg:invisible text-orange fill-current h-6 w-6 absolute top-0 right-0 m-1"
					/>
				</td>
				<td
					class="w-full lg:w-2/5 py-6 px-2 lg:px-0 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>DESCRIPTION</span
					>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</td>
				<td
					class="w-full lg:w-1/6 p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>EVENT DATE</span
					>
					<span class="py-1 px-3 pl-0 text-base text-orange">2020-07-28</span>
				</td>
				<td
					class="w-full lg:w-auto p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange lg:relative"
				>
					<IconifyIcon
						:icon="icons.settingOutlined"
						class="invisible lg:visible text-orange fill-current h-6 w-6 absolute top-0 right-0 p-1"
					/>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>PASSWORD</span
					>

					<span class="py-1 px-3 pl-0 text-base inline"
						>yo
						<IconifyIcon
							:icon="icons.eyeOutlined"
							class="text-orange fill-current h-6 w-6 inline"
						/>
					</span>
					<div class="flex justify-end align-bottom pt-5">
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 mr-5 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							PREVIEW
						</button>
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							EDITOR
						</button>
					</div>
				</td>
			</tr>
			<tr
				class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
			>
				<td
					class="w-full py-6 text-xl lg:w-1/6 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display lg:text-base text-orange font-normal lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>TITLE</span
					>
					KnobHome

					<IconifyIcon
						:icon="icons.settingOutlined"
						class="visible lg:invisible text-orange fill-current h-6 w-6 absolute top-0 right-0 m-1"
					/>
				</td>
				<td
					class="w-full lg:w-2/5 py-6 px-2 lg:px-0 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>DESCRIPTION</span
					>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</td>
				<td
					class="w-full lg:w-1/6 p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>EVENT DATE</span
					>
					<span class="py-1 px-3 pl-0 text-base text-orange">2020-07-28</span>
				</td>
				<td
					class="w-full lg:w-auto p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange lg:relative"
				>
					<IconifyIcon
						:icon="icons.settingOutlined"
						class="invisible lg:visible text-orange fill-current h-6 w-6 absolute top-0 right-0 p-1"
					/>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>PASSWORD</span
					>

					<span class="py-1 px-3 pl-0 text-base inline"
						>yo
						<IconifyIcon
							:icon="icons.eyeOutlined"
							class="text-orange fill-current h-6 w-6 inline"
						/>
					</span>
					<div class="flex justify-end align-bottom pt-5">
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 mr-5 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							PREVIEW
						</button>
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							EDITOR
						</button>
					</div>
				</td>
			</tr>
			<tr
				class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
			>
				<td
					class="w-full py-6 text-xl lg:w-1/6 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display lg:text-base text-orange font-normal lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>TITLE</span
					>
					KnobHome

					<IconifyIcon
						:icon="icons.settingOutlined"
						class="visible lg:invisible text-orange fill-current h-6 w-6 absolute top-0 right-0 m-1"
					/>
				</td>
				<td
					class="w-full lg:w-2/5 py-6 px-2 lg:px-0 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>DESCRIPTION</span
					>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</td>
				<td
					class="w-full lg:w-1/6 p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>EVENT DATE</span
					>
					<span class="py-1 px-3 pl-0 text-base text-orange">2020-07-28</span>
				</td>
				<td
					class="w-full lg:w-auto p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange lg:relative"
				>
					<IconifyIcon
						:icon="icons.settingOutlined"
						class="invisible lg:visible text-orange fill-current h-6 w-6 absolute top-0 right-0 p-1"
					/>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>PASSWORD</span
					>

					<span class="py-1 px-3 pl-0 text-base inline"
						>yo
						<IconifyIcon
							:icon="icons.eyeOutlined"
							class="text-orange fill-current h-6 w-6 inline"
						/>
					</span>
					<div class="flex justify-end align-bottom pt-5">
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 mr-5 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							PREVIEW
						</button>
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							EDITOR
						</button>
					</div>
				</td>
			</tr>
			<tr
				class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
			>
				<td
					class="w-full py-6 text-xl lg:w-1/6 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display lg:text-base text-orange font-normal lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>TITLE</span
					>
					KnobHome

					<IconifyIcon
						:icon="icons.settingOutlined"
						class="visible lg:invisible text-orange fill-current h-6 w-6 absolute top-0 right-0 m-1"
					/>
				</td>
				<td
					class="w-full lg:w-2/5 py-6 px-2 lg:px-0 lg:p-3 lg:pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
						>DESCRIPTION</span
					>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</td>
				<td
					class="w-full lg:w-1/6 p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange"
				>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>EVENT DATE</span
					>
					<span class="py-1 px-3 pl-0 text-base text-orange">2020-07-28</span>
				</td>
				<td
					class="w-full lg:w-auto p-3 pl-0 border border-b text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange lg:relative"
				>
					<IconifyIcon
						:icon="icons.settingOutlined"
						class="invisible lg:visible text-orange fill-current h-6 w-6 absolute top-0 right-0 p-1"
					/>
					<span
						class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
						>PASSWORD</span
					>

					<span class="py-1 px-3 pl-0 text-base inline"
						>yo
						<IconifyIcon
							:icon="icons.eyeOutlined"
							class="text-orange fill-current h-6 w-6 inline"
						/>
					</span>
					<div class="flex justify-end align-bottom pt-5">
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 mr-5 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							PREVIEW
						</button>
						<button
							class="appearance-none block w-auto border border-dotted py-1 px-2 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white"
						>
							EDITOR
						</button>
					</div>
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

import IconifyIcon from '@iconify/vue';
import eyeOutlined from '@iconify/icons-ant-design/eye-outlined';
import eyeInvisibleOutlined from '@iconify/icons-ant-design/eye-invisible-outlined';
import settingOutlined from '@iconify/icons-ant-design/setting-outlined';

export default {
	name: 'TheEventTable',
	components: {
		Vuetable,
		IconifyIcon,
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
			icons: {
				eyeOutlined,
				eyeInvisibleOutlined,
				settingOutlined,
			},
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
