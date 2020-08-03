<!-- src/App/index.vue -->
<template>
	<div>
		<TheHeader :loggedIn="loggedIn"></TheHeader>
		<TheLanding v-if="!loggedIn"></TheLanding>
		<TheHome v-else></TheHome>
	</div>
</template>
<script>
import bus from '../bus';
import TheHeader from '../components/layout/TheHeader.vue';
import TheLanding from '../pages/TheLanding/index.vue';
import TheHome from '../pages/TheHome/index.vue';

export default {
	name: 'App',
	components: {
		TheHeader,
		TheLanding,
		TheHome,
	},
	created() {
		bus.$on('log-out', () => {
			localStorage.clear();
			this.loggedIn = false;
		});
		bus.$on('login-success', (token) => {
			localStorage.token = token;
			this.loggedIn = true;
			console.log(bus.loggedIn);
		});
		if (localStorage.token) {
			this.loggedIn = true;
		}
	},
	data() {
		return {
			loggedIn: false,
		};
	},
	methods: {
		login(e) {},
	},
};
</script>
<style></style>
