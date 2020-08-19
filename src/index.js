import 'core-js/stable';
import 'regenerator-runtime/runtime';
import api from './utils/api/index';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import router from './router';

import AppComponent from './App/index.vue';

import './assets/style.css';

Vue.prototype.$api = api;
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
	link: createUploadLink({ uri: process.env.API_URL }),
	cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

const vm = new Vue({
	apolloProvider,
	router,
	el: '#app',
	components: {
		app: AppComponent,
	},
	render: (h) => h('app'),
});
