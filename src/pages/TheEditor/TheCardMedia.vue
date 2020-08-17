<template>
	<div
		class="group border border-dotted border-orange w-11/12 relative mx-auto p-5 border-opacity-25 hover:border-opacity-100"
	>
		<button
			type="button"
			class="btn-close absolute left-0 top-0 ml-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
			aria-label="Delete event"
			@click="deleteCardMedia"
		>
			<IconifyIcon
				:icon="icons.deleteIcon"
				class="text-orange h-3 w-3 transition duration-500 hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
			/>
		</button>
		<button
			type="button"
			class="btn-close absolute right-0 top-0 mr-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
			aria-label="Edit event"
		>
			<IconifyIcon
				:icon="icons.editOutlined"
				class="text-orange h-4 w-4 transition duration-500 hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
			/>
		</button>
		<div>Sort Order: {{ media.sortOrder }}</div>
		<div>Id: {{ media.id }}</div>
		<div>Type: {{ media.type }}</div>
	</div>
</template>
<script>
import IconifyIcon from '@iconify/vue';
import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import deleteIcon from '@iconify/icons-wpf/delete';
import editOutlined from '@iconify/icons-ant-design/edit-outlined';

import bus from '../../bus';

import { ElementMixin } from 'vue-slicksort';

export default {
	name: 'TheCardMedia',
	components: {
		IconifyIcon,
	},
	props: { media: { type: Object, default: () => [] } },
	data() {
		return {
			icons: {
				plusCircleOutlined,
				deleteIcon,
				editOutlined,
			},
		};
	},
	mixins: [ElementMixin],
	methods: {
		async deleteCardMedia() {
			let response = await this.$api.cardMedia.deleteCardMedia(this.media.id);
			if (response) {
				bus.$emit('card-media-delete', this.media.id);
			}
		},
	},
};
</script>
<style></style>
