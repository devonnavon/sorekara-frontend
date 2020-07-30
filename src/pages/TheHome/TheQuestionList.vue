<!-- src/pages/TheHome/TheQuestionList.vue -->
<template>
	<div class="font-display">
		<h1 class="text-orange text-lg pb-10 font-semibold">{{ title }}</h1>
		<div class="grid grid-cols-2 gap-4 text-orange font-semibold text-sm">
			<div
				v-for="(text, index) in textInfo"
				:key="index"
				@click="questionClick(index)"
			>
				{{ text.question }}
			</div>
		</div>
	</div>
</template>
<script>
import bus from '../../bus';

export default {
	name: 'TheQuestionList',
	components: {},
	props: {
		title: String,
		textInfo: Array,
	},
	data() {
		return {};
	},
	methods: {
		questionClick(index) {
			bus.$emit('question-click', index);
		},
	},
};
</script>
<style></style>
