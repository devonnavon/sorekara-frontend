<template>
	<div class="font-sans antialiased" id="app">
		<nav class="flex items-center justify-between flex-no-wrap bg-white p-6">
			<div class="flex items-center">
				<img class="object-contain" src="src/assets/logo.svg" />
			</div>
			<div class="block sm:hidden">
				<button
					@click="toggle"
					class="flex items-center flex-shrink-1 px-3 py-2 ml-5 border rounded text-orange-lighter border-white-light hover:text-white hover:border-white"
				>
					<!-- <svg
						class="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg> -->
					<IconifyIcon :icon="icons.enterIcon" :style="{ color: '#4c5b61' }" />
				</button>
			</div>
			<div
				:class="open ? 'block' : 'hidden'"
				class="w-full flex-grow sm:flex sm:items-center sm:w-auto justify-end self-end"
			>
				<div class="self-end">
					<a
						href="#"
						class="no-underline inline-block text-base px-4 leading-none border rounded text-orange border-white hover:text-opacity-60 mt-4 sm:mt-0 font-display font-semibold self-end"
						>LOG IN / SIGN UP</a
					>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
// import logo from './../../assets/logo.svg';
import IconifyIcon from '@iconify/vue';
import enterIcon from '@iconify/icons-gg/enter';

export default {
	name: 'app-header',
	components: {
		IconifyIcon,
	},
	data() {
		return {
			open: false,
			icons: {
				enterIcon,
			},
		};
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
	},
};
</script>
