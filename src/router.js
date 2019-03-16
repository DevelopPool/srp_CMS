import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import BadGateway from '@/views/BadGateway.vue';
import ExpressDaily from '@/views/Attendance.vue';
import LoginPage from '@/views/LoginPage.vue';
import Axios from 'axios';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/login-page',
			name: 'LoginPage',
			props: { page: 0 },
			component: LoginPage,
		},
		{
			path: '/attendance',
			name: 'Attendance',
			component: ExpressDaily,
			props: { page: 1 },
			beforeEnter: AuthGuard,
		},
		{
			path: '/404',
			name: 'BadGateway',
			props: { page: 5 },
			component: BadGateway,
		},
		{
			path: '*',
			props: { page: 5 },
			redirect: '/404',
		},
	],
});

function AuthGuard(to, from, next) {
	if (store.state.uid) {
		const url = API + '/checkLogin';
		const postBody = { uid: store.state.uid };
		axios
			.post(url, postBody)
			.then(res => {
				console.log(res);
				if (res.data.excutionResult === 'success') {
					next();
				} else {
					next('/login-page');
				}
			})
			.catch(e => console.error(e));
	} else {
		next('/login-page');
	}
}
