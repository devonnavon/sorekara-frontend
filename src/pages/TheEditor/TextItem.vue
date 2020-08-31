<template>
	<div v-if="text">{{ text }}</div>
	<Trumbowyg v-else></Trumbowyg>
</template>
<script>
import bus from '../../bus';
import Trumbowyg from '../../components/ui/Toolbar.vue';

export default {
	name: 'TextItem',
	components: {
		Trumbowyg,
	},
	props: {
		id: Number,
		text: String,
	},
	data() {
		return {};
	},
	mounted() {},
};
</script>
<style>
.trumbowyg-box {
	background-color: blue;
	height: 100%;
	min-height: 88px;
	margin: auto;
	flex: 1;
}
.trumbowyg-editor,
.trumbowyg-textarea {
	min-height: calc(100% - 39px);
}
</style>
