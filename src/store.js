import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

// Initialize Firebase
const config = {
	apiKey: 'AIzaSyDiWvzSG8kFr2oPLyrLleEmxGxMY3ed5Hw',
	authDomain: 'my-fuck-awesome-project.firebaseapp.com',
	databaseURL: 'https://my-fuck-awesome-project.firebaseio.com',
	projectId: 'my-fuck-awesome-project',
	storageBucket: 'my-fuck-awesome-project.appspot.com',
	messagingSenderId: '885320638463',
};
firebase.initializeApp(config);

export default new Vuex.Store({
	state: {
		token: '',
		loginStatus: false,
		scheduleToday: [],
		customerData: [],
		phoneIdChart: {},
	},
	mutations: {
		changeLoginStatus(state, token) {
			state.loginStatus = !state.loginStatus;
			state.token = token;
			localStorage.setItem('user_token', token);
		},
	},
	actions: {
		autoLogin({ commit }, token) {
			commit('changeLoginStatus', token);
		},
	},
});
