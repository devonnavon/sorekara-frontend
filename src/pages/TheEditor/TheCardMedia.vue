<template>
	<div
		class="group border border-dotted border-orange w-11/12 relative mx-auto p-5 border-opacity-25 hover:border-opacity-100"
	>
		<div class="flex justify-between -mt-3">
			<button
				type="button"
				class="btn-close focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
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
				v-handle
				class="handle focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
				aria-label="Reorder Event Media"
			>
				<IconifyIcon
					:icon="icons.dragHorizontal"
					class="text-orange h-6 w-6 transition duration-500 hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
				/>
			</button>
			<button
				type="button"
				class="btn-close focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
				aria-label="Edit event"
			>
				<IconifyIcon
					:icon="icons.editOutlined"
					class="text-orange h-4 w-4 transition duration-500 hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
				/>
			</button>
		</div>
		<!-- <div>Sort Order: {{ media.sortOrder }}</div>
    <div>Id: {{ media.id }}</div>
    <div>Type: {{ media.type }}</div>-->

		<!-- below we bind the body of TheMedia component to its specific media type
		this way we can manage types in their own components and use this compenent for 
    higher level logic such as sorting, sizing and splitting cards-->
		<component
			v-bind:is="mediaComponent"
			:url="this.media.url"
			:id="this.media.id"
		></component>
	</div>
</template>
<script>
import IconifyIcon from '@iconify/vue';
import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import deleteIcon from '@iconify/icons-wpf/delete';
import editOutlined from '@iconify/icons-ant-design/edit-outlined';
import dragHorizontal from '@iconify/icons-mdi/drag-horizontal';

import { ElementMixin, HandleDirective } from 'vue-slicksort';

import bus from '../../bus';

import ImageMedia from '../../components/media/ImageMedia.vue';
import TextMedia from '../../components/media/TextMedia.vue';

export default {
	name: 'TheCardMedia',
	components: {
		IconifyIcon,
		ImageMedia,
		TextMedia,
	},
	props: {
		media: { type: Object, default: () => [] },
	},
	created() {
		console.log(this.media);
	},
	data() {
		return {
			icons: {
				plusCircleOutlined,
				deleteIcon,
				editOutlined,
				dragHorizontal,
			},
		};
	},
	computed: {
		mediaComponent() {
			const mediaType = this.media.type;
			return `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}Media`;
		},
	},
	mixins: [ElementMixin],
	directives: { handle: HandleDirective },
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
