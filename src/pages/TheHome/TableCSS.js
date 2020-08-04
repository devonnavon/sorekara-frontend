export default {
	table: {
		tableWrapper: '',
		tableHeaderClass: 'fixed',
		tableBodyClass: 'vuetable-semantic-no-top fixed',
		tableClass:
			'w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5',
		loadingClass: 'loading',
		ascendingIcon: 'blue chevron up icon',
		descendingIcon: 'blue chevron down icon',
		ascendingClass: 'sorted-asc',
		descendingClass: 'sorted-desc',
		sortableIcon: 'grey sort icon',
		handleIcon: 'grey sidebar icon',
	},
	pagination: {
		wrapperClass: 'pagination float-right',
		activeClass: 'active',
		disabledClass: 'disabled',
		pageClass: 'page-item',
		linkClass: 'page-link',
		paginationClass: 'pagination',
		paginationInfoClass: 'float-left',
		dropdownClass: 'form-control',
		icons: {
			first: 'fa fa-chevron-left',
			prev: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			last: 'fa fa-chevron-right',
		},
	},
};
