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
		<div>Sort Order: {{ media.sortOrder }}</div>
		<div>Id: {{ media.id }}</div>
		<div>Type: {{ media.type }}</div>
		<div v-show="media.type === 'image'">
			<vue-dropzone
				ref="imgDropzone"
				id="imgDropzone"
				:options="dropzoneOptions"
				@vdropzone-complete="afterComplete"
				class="border border-dotted border-orange border-opacity-25 font-display text-base text-orange hover:bg-orange hover:bg-opacity-25 text-lg text-opacity-75"
			></vue-dropzone>
		</div>
		<div v-show="media.type === 'text'">
			<Trumbowyg />
		</div>
	</div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import IconifyIcon from '@iconify/vue';
import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import deleteIcon from '@iconify/icons-wpf/delete';
import editOutlined from '@iconify/icons-ant-design/edit-outlined';
import dragHorizontal from '@iconify/icons-mdi/drag-horizontal';

import bus from '../../bus';

import { ElementMixin, HandleDirective } from 'vue-slicksort';

import Trumbowyg from '../../components/ui/Toolbar.vue';

let uuid = require('uuid');

export default {
	name: 'TheCardMedia',
	components: {
		IconifyIcon,
		vueDropzone: vue2Dropzone,
		Trumbowyg,
	},
	props: { media: { type: Object, default: () => [] } },
	data() {
		return {
			images: [],
			dropzoneOptions: {
				url: 'https://httpbin.org/post',
				thumbnailWidth: 250,
				thumbnailHeight: 250,
				addRemoveLinks: false,
				acceptedFiles: '.jpg, .jpeg, .png, .gif',
			},
			icons: {
				plusCircleOutlined,
				deleteIcon,
				editOutlined,
				dragHorizontal,
			},
		};
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

		async afterComplete(file) {
			try {
				const filename = uuid.v1();
				const url = await this.$api.file.upload(file, filename);
				this.$refs.imgDropzone.removeFile(file);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
<style></style>
