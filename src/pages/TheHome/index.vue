<!-- home -->
<template>
	<div>
		<TheAppHeader></TheAppHeader>
		<TheEventTable></TheEventTable>
	</div>
</template>
<script>
import TheEventTable from '../../components/layout/TheEventTable.vue';
import TheAppHeader from '../../components/layout/TheAppHeader.vue';

export default {
	name: 'TheHome',
	components: {
		TheAppHeader,
		TheEventTable,
	},
	data() {
		return {};
	},
};
</script>
<style></style>
