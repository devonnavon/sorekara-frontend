import VuetableFieldHandle from 'vuetable-2/src/components/VuetableFieldHandle.vue';

export default [
	{
		name: VuetableFieldHandle,
	},
	{
		name: 'title',
		title: '<span class="orange glyphicon glyphicon-user"></span> Title',
		sortField: 'title',
	},
	'description',

	{
		name: 'eventDate',
		sortField: 'eventDate',
	},
	'password',
	'actions',
];
