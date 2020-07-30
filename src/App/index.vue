<!-- src/App/index.vue -->
<template>
	<div>
		<TheHeader></TheHeader>
		<TheHome></TheHome>
	</div>
</template>
<script>
import TheHeader from '../components/layout/TheHeader.vue';
import TheHome from '../pages/TheHome/index.vue';

export default {
	name: 'App',
	components: {
		TheHeader,
		TheHome,
	},

	data() {
		return {};
	},
};
</script>
<style></style>
