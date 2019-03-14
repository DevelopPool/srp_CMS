import Vue from 'vue';
import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';

window.API = 'https://us-central1-deliwater.cloudfunctions.net/';
window.axios = axios;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
