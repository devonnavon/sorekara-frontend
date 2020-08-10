<!-- src/App/index.vue -->
<template>
	<div class="xl:container mx-auto px-6 sm:px-12 pt-6">
		<!-- <TheHeader :loggedIn="loggedIn"></TheHeader>÷ -->
		<RouterView />
		<!-- <TheLanding v-if="!loggedIn"></TheLanding>
		<TheHome v-else></TheHome> -->
	</div>
</template>
<script>
import bus from '../bus';
// import TheHeader from '../components/layout/TheHeader.vue';
import TheLanding from '../pages/TheLanding/index.vue';
import TheHome from '../pages/TheHome/index.vue';

export default {
	name: 'App',
	components: {
		TheLanding,
		TheHome,
	},
	created() {
		console.log(this.$router.currentRoute);
		bus.$on('log-out', () => {
			localStorage.clear();
			this.loggedIn = false;
			this.$router.push('/');
		});
		bus.$on('login-success', (token) => {
			localStorage.token = token;
			this.loggedIn = true;
			this.$router.push('/home');
		});
		if (localStorage.token) {
			this.loggedIn = true;
			// this.$router.push('/home');
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
