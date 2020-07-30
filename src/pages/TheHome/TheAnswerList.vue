<!-- src/pages/TheHome/TheAnswerList.vue -->
<template>
	<div>
		<div v-for="(text, index) in textInfo" :key="index">
			<div>{{ text.title }}</div>
			<div>{{ text.answer }}</div>
			<div v-if="text.focused">Hey there ScoTT</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'TheAnswerList',
	components: {},
	props: {
		textInfo: Array,
	},
	data() {
		return {};
	},
};
</script>
<style></style>
