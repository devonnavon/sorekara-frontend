<!-- src/App/index.vue -->
<template>
	<div>
		<app-header></app-header>
		<div>WHYs</div>
	</div>
</template>
<script>
import appHeader from '../components/layout/app-header.vue';

export default {
	name: 'App',
	components: {
		'app-header': appHeader,
	},

	data() {
		return {};
	},
};
</script>
<style></style>
