<template>
	<div class="pt-6">
		<SortableList
			lockAxis="y"
			v-model="eventCardsCopy"
			:distance="5"
			@sort-end="itemMove"
		>
			<TheEventCard
				v-for="(eventCard, index) in eventCardsCopy"
				:index="index"
				:key="eventCard.id"
				:id="eventCard.id"
				:size="eventCard.size"
				:cardMedia="eventCard.cardMedia"
				class="my-6 select-none"
			></TheEventCard>

			<!-- <TheEventCard
			v-for="eventCard in eventCardsSorted"
			:key="eventCard.id"
			:size="eventCard.size"
			:cardMedia="eventCard.cardMedia"
      ></TheEventCard>-->
		</SortableList>
		<div class="flex flex-row justify-center py-4">
			<button
				class="font-display text-orange text-4xl focus:outline-none outline-none self-center"
				@click="createEventCard"
			>
				<IconifyIcon
					:icon="icons.plusCircleOutlined"
					class="text-orange text-center fill-current transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none"
				/>
			</button>
		</div>
	</div>
</template>

<script>
import bus from '../../bus';
import { SlickItem, SlickList } from 'vue-slicksort';
import SortableList from '../../components/ui/SortableList.vue';

import TheEventCard from './TheEventCard.vue';

import IconifyIcon from '@iconify/vue';
import eyeOutlined from '@iconify/icons-ant-design/eye-outlined';
import eyeInvisibleOutlined from '@iconify/icons-ant-design/eye-invisible-outlined';
import settingOutlined from '@iconify/icons-ant-design/setting-outlined';
import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import deleteIcon from '@iconify/icons-wpf/delete';

export default {
	name: 'TheEventEditor',
	components: {
		IconifyIcon,
		TheEventCard,
		SortableList,
	},
	props: {
		eventCards: { type: Array, default: () => [] },
	},
	data() {
		return {
			icons: {
				settingOutlined,
				plusCircleOutlined,
				deleteIcon,
			},
			eventCardsCopy: [],
		};
	},
	created() {
		bus.$on('event-card-delete', this.removeEventCard);
	},
	watch: {
		eventCards: function(newVal, oldVal) {
			// watch it
			this.eventCardsCopy = newVal
				.slice()
				.sort((a, b) => a.sortOrder - b.sortOrder);
		},
	},
	methods: {
		async createEventCard() {
			let response = await this.$api.eventCard.create({
				eventId: this.$route.params.eventID,
				size: 'full',
				sortOrder: this.eventCardsCopy.length + 1,
			});
			this.eventCardsCopy.push(response);
		},
		removeEventCard(id) {
			const index = this.eventCardsCopy.findIndex((item) => item.id === id);
			this.eventCardsCopy.splice(index, 1);
		},
		async itemMove(e) {
			//event Card!!!
			let eventCardId = this.eventCardsCopy[e.oldIndex].id;
			await this.$api.eventCard.update({
				id: eventCardId,
				sortOrder: e.newIndex + 1,
			});
		},
	},
};
</script>

<style></style>
