import Vue from 'vue';
import Router from 'vue-router';

import TheHome from '../pages/TheHome/index.vue';
import TheLanding from '../pages/TheLanding/index.vue';
import TheEditor from '../pages/TheEditor/index.vue';

Vue.use(Router);

const routes = [
	{
		path: '/:username',
		name: 'home',
		component: TheHome,
	},
	{
		path: '/',
		name: 'landing',
		component: TheLanding,
	},
	{
		path: '/go/:eventID',
		name: 'edit',
		component: TheEditor,
	},
];

export default new Router({
	routes,
});
