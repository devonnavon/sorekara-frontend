<template>
	<div class="font-sans antialiased" id="app">
		<nav class="flex items-center justify-between flex-wrap bg-white p-6">
			<div class="flex items-center flex-no-shrink text-orange mr-6">
				<img class="object-contain" src="src/assets/logo.svg" />
			</div>
			<div class="block sm:hidden">
				<button
					@click="toggle"
					class="flex items-center px-3 py-2 border rounded text-orange-lighter border-white-light hover:text-white hover:border-white"
				>
					<svg
						class="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div
				:class="open ? 'block' : 'hidden'"
				class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
			>
				<div class="text-sm sm:flex-grow">
					<a
						href="#responsive-header"
						class="no-underline block mt-4 sm:inline-block sm:mt-0 text-white-lighter hover:text-white mr-4"
					>
						Docs
					</a>
					<a
						href="#responsive-header"
						class="no-underline block mt-4 sm:inline-block sm:mt-0 text-white-lighter hover:text-white mr-4"
					>
						Examples
					</a>
					<a
						href="#responsive-header"
						class="no-underline block mt-4 sm:inline-block sm:mt-0 text-white-lighter hover:text-white"
					>
						Blog
					</a>
				</div>
				<div>
					<a
						href="#"
						class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-orange border-white hover:border-transparent hover:text-white hover:bg-white mt-4 sm:mt-0"
						>Download</a
					>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
// import logo from './../../assets/logo.svg';

export default {
	name: 'app-header',
	components: {},
	data: {
		open: false,
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
	},
};
</script>
