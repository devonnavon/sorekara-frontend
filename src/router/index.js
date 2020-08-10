import Vue from 'vue';
import Router from 'vue-router';

import TheHome from '../pages/TheHome/index.vue';
import TheLanding from '../pages/TheLanding/index.vue';

Vue.use(Router);

const routes = [
	{
		path: '/home',
		name: 'home',
		component: TheHome,
	},
	{
		path: '/',
		name: 'landing',
		component: TheLanding,
	},
];

export default new Router({
	routes,
});
