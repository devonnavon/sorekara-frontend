<!-- home -->
<template>
	<div class="pt-6 lg:p-6">
		<TheEventTable :events="events"></TheEventTable>
	</div>
</template>
<script>
import TheEventTable from '../../components/layout/TheEventTable.vue';

export default {
	name: 'TheHome',
	components: {
		TheEventTable,
	},
	data() {
		return { events: [] };
	},
	async created() {
		let response = await this.$api.event.events();
		this.events = response.data.events;
	},
};
</script>
<style></style>
