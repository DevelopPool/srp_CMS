import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
		pushCustomerData(state, customerData) {
			state.customerData = customerData;
		},
		addCustomerIdPhone(state, customerData) {
			customerData.forEach(item => {
				let phoneArray = item.contact.filter(contact => contact.type === 'phone');
				phoneArray = phoneArray.map(phoneItem => phoneItem.value);

				phoneArray.forEach(val => {
					state.phoneIdChart[val] = item.id;
				});
			});
		},
	},
	actions: {
		autoLogin({ commit }, token) {
			commit('changeLoginStatus', token);
		},
		asyncCustomerData({ commit }, customerData) {
			commit('pushCustomerData', customerData);
			commit('addCustomerIdPhone', customerData);
		},
	},
});
