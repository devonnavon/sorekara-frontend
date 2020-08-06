<template>
	<div>
		<BaseModal>
			<!-- <TheLoginForm></TheLoginForm>
      <TheRegisterForm></TheRegisterForm>-->
			<transition name="fade" mode="out-in">
				<form class>
					<div class="text-center relative pb-5">
						<div class="flex items-center justify-center"></div>
						<h2 v-show="modalState === 'create'" class="text-4xl">
							Create Event
						</h2>
						<h2 v-show="modalState === 'update'" class="text-4xl">
							Update Event
						</h2>
					</div>
					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full md:w-full px-3 mb-6 text-opacity-60">
							<label
								class="block uppercase text-gray-700 text-xs font-bold mb-2"
								for="Title"
								>TITLE</label
							>
							<input
								v-model="title"
								class="appearance-none block w-full bg-white text-gray-900 border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none placeholder-orange"
								type="text"
								placeholder="A nice title"
								required
							/>
						</div>
						<div class="w-full md:w-full px-3 mb-6">
							<label
								class="block uppercase text-xs font-bold mb-2 text-opacity-60"
								for="Description"
								>DESCRIPTION</label
							>
							<textarea
								v-model="description"
								class="appearance-none block w-full bg-white border border-gray-400 rounded-lg py-3 px-3 focus:outline-none resize-none overflow-hidden placeholder-orange"
								placeholder="A nice description, you don't have to if you don't want to though"
							/>
						</div>
						<div class="w-full md:w-full px-3 mb-6">
							<label
								class="block uppercase text-xs font-bold mb-2 text-opacity-60"
								for="eventDate"
								>EVENT DATE</label
							>
							<input
								v-model="eventDate"
								class="block ml-0 pl-0 outline-current placeholder-orange focus:border-orange"
								type="date"
								name="eventDate"
							/>
						</div>

						<div class="w-full md:w-full px-3 mb-6">
							<label
								class="block uppercase te text-xs mb-2 text-opacity-60"
								for="Password"
								>Password</label
							>
							<input
								v-model="password"
								class="appearance-none block w-full bg-white font-medium border border-gray-400 rounded-lg py-3 px-3 focus:outline-none placeholder-orange"
								type="text"
								placeholder="Leave blank for an open event!"
							/>
						</div>
						<div
							v-show="modalState === 'create'"
							class="w-full md:w-full px-3 mb-6"
						>
							<button
								@click="create"
								@submit.prevent
								class="appearance-none block w-full border border-gray-200 rounded-lg py-3 px-3 transition ease-in duration-200 hover:bg-orange hover:text-white focus:outline-none focus:bg-orange focus:text-white"
							>
								CREATE
							</button>
						</div>
						<div
							v-show="modalState === 'update'"
							class="w-full md:w-full px-3 mb-6"
						>
							<button
								@click="update"
								@submit.prevent
								class="appearance-none block w-full border border-gray-200 rounded-lg py-3 px-3 transition ease-in duration-200 hover:bg-orange hover:text-white focus:outline-none focus:bg-orange focus:text-white"
							>
								UPDATE
							</button>
						</div>
					</div>
				</form>
			</transition>
			<!-- <component v-bind:is="currentFormComponent"></component> -->
		</BaseModal>
	</div>
</template>
<script>
import BaseModal from './BaseModal.vue';
import bus from '../../bus';

import moment from 'moment';

export default {
	name: 'TheEventModal',
	components: { BaseModal },
	props: { event: Object },
	data() {
		return {
			title: '',
			description: '',
			password: '',
			eventDate: moment().format('YYYY-MM-DD'),
		};
	},
	watch: {
		event(event) {
			if (event) {
				this.title = event.title;
				this.description = event.description;
				this.password = event.password;
				this.eventDate = moment(event.eventDate).format('YYYY-MM-DD');
			} else {
				this.title = '';
				this.description = '';
				this.password = '';
				this.eventDate = moment().format('YYYY-MM-DD');
			}
		},
	},
	computed: {
		modalState() {
			if (this.event) {
				return 'update';
			} else {
				return 'create';
			}
		},
	},
	methods: {
		async create() {
			const newEvent = await this.$api.event.create({
				title: this.title,
				description: this.description,
				password: this.password,
				eventDate: moment(this.eventDate),
			});
			console.log(newEvent);
		},
		async update() {
			const updatedEvent = await this.$api.event.update({
				id: this.event.id,
				title: this.title,
				description: this.description,
				password: this.password,
				eventDate: moment(this.eventDate),
			});
		},
	},
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s !important;
}
.fade-enter,
.fade-leave-to {
	opacity: 0 !important;
}
</style>
