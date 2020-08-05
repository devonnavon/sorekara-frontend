import 'core-js/stable';
import 'regenerator-runtime/runtime';
import api from './utils/api/index';
import Vue from 'vue';

import AppComponent from './App/index.vue';

import './assets/style.css';

Vue.prototype.$api = api;

const vm = new Vue({
	el: '#app',
	components: {
		app: AppComponent,
	},
	render: (h) => h('app'),
});
