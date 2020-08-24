<template>
	<div
		class="group border border-dashed border-orange w-full relative pt-8 border-opacity-25 hover:border-opacity-100"
	>
		<button
			type="button"
			class="btn-close absolute left-0 top-0 ml-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
			aria-label="Delete event"
			@click="deleteEventCard"
		>
			<IconifyIcon
				:icon="icons.deleteIcon"
				class="text-orange h-5 w-5 transition duration-500 ease-in-out hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
			/>
		</button>
		<SortableList
			v-model="cardMediaCopy"
			:useDragHandle="true"
			@sort-end="itemMove"
		>
			<TheCardMedia
				v-for="(media, index) in cardMediaCopy"
				:index="index"
				:media="media"
				:key="media.id"
				class="my-4"
			></TheCardMedia>
		</SortableList>

		<div class="flex flex-row justify-center py-3">
			<DropDown
				:on-click="createCardMedia"
				:items="mediaType"
				class="self-center z-50"
			>
				<IconifyIcon
					:icon="icons.plusCircleOutlined"
					class="text-orange text-center fill-current bg-white transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none sm:text-opacity-0 sm:group-hover:text-opacity-100 transition duration-500 ease-in-out"
				/>
			</DropDown>
		</div>
	</div>
</template>
<script>
import DropDown from '../../components/event/DropDown.vue';
import TheCardMedia from './TheCardMedia.vue';

import { ElementMixin } from 'vue-slicksort';
import SortableList from '../../components/ui/SortableList.vue';

import IconifyIcon from '@iconify/vue';
import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import deleteIcon from '@iconify/icons-wpf/delete';
import bus from '../../bus';

export default {
	name: 'TheEventCard',
	components: {
		DropDown,
		TheCardMedia,
		IconifyIcon,
		SortableList,
	},
	props: {
		size: { type: String, default: 'full' },
		cardMedia: { type: Array, default: () => [] },
		id: { type: String },
	},
	mixins: [ElementMixin],
	data() {
		return {
			// activeMedia: '',
			mediaType: ['text', 'image'],
			icons: {
				plusCircleOutlined,
				deleteIcon,
			},
			cardMediaCopy: this.cardMedia
				.slice()
				.sort((a, b) => a.sortOrder - b.sortOrder),
		};
	},
	created() {
		bus.$on('card-media-delete', this.removeCardMedia);
	},
	methods: {
		async deleteEventCard() {
			let response = await this.$api.eventCard.deleteEventCard(this.id);
			if (response) {
				bus.$emit('event-card-delete', this.id);
			}
		},
		async createCardMedia(type) {
			let response = await this.$api.cardMedia.create({
				eventCardId: this.id,
				type,
				sortOrder: this.cardMedia.length + 1,
			});
			this.cardMediaCopy.push(response);
		},
		removeCardMedia(id) {
			const index = this.cardMediaCopy.findIndex((item) => item.id === id);
			this.cardMediaCopy.splice(index, 1);
		},
		async itemMove(e) {
			//card media!!!
			let cardMediaId = this.cardMediaCopy[e.oldIndex].id;
			await this.$api.cardMedia.update({
				id: cardMediaId,
				sortOrder: e.newIndex + 1,
			});
		},
	},
};
</script>
<style></style>
