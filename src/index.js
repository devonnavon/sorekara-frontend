import Vue from 'vue';

import AppComponent from './app/index.vue';

import './assets/style.css';

const vm = new Vue({
	el: '#app',
	components: {
		app: AppComponent,
	},
	render: (h) => h('app'),
});
