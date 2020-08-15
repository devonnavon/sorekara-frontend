<template>
	<div class="font-sans antialiased" id="app">
		<nav class="flex items-center justify-between flex-no-wrap bg-white">
			<div class="flex items-center">
				<img class="object-contain" src="img/logo.svg" />
			</div>
			<div class="block sm:hidden">
				<button @click="logOut" class="flex items-end flex-shrink-1 pt-2 ml-5">
					<!-- border rounded text-orange-lighter border-white-light hover:text-white hover:border-white -->
					<!-- <svg
						class="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>-->
					<IconifyIcon
						:icon="icons.enterIcon"
						class="text-orange fill-current h-6 w-6"
					/>
				</button>
			</div>
			<div
				class="w-full flex-grow sm:flex sm:items-center sm:w-auto justify-end self-end hidden sm:show"
			>
				<div class="self-end" @click="logOut">
					<a
						href="#"
						class="no-underline inline-block text-base pl-4 leading-none border rounded text-orange border-white hover:text-opacity-60 mt-4 sm:mt-0 font-display self-end"
						>LOG OUT</a
					>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
// import logo from './../../assets/logo.svg';
import bus from '../../bus';
import IconifyIcon from '@iconify/vue';
import enterIcon from '@iconify/icons-gg/enter';

export default {
	name: 'app-header',
	components: {
		IconifyIcon,
	},
	data() {
		return {
			icons: {
				enterIcon,
			},
		};
	},
	methods: {
		logOut() {
			bus.$emit('log-out');
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
