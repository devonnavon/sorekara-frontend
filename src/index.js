import 'core-js/stable';
import 'regenerator-runtime/runtime';
import api from './utils/api/index';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloClient } from 'apollo-client';
// import { createUploadLink } from 'apollo-upload-client';
import Vue from 'vue';
import router from './router';

import AppComponent from './App/index.vue';

import './assets/style.css';

Vue.prototype.$api = api;

const vm = new Vue({
	router,
	el: '#app',
	components: {
		app: AppComponent,
	},
	render: (h) => h('app'),
});
