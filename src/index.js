import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';

import AppComponent from './App/index.vue';

import './assets/style.css';

console.log(process.env);

const vm = new Vue({
	el: '#app',
	components: {
		app: AppComponent,
	},
	render: (h) => h('app'),
});
