import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import BadGateway from '@/views/BadGateway.vue';
import Attendance from '@/views/Attendance.vue';
import LoginPage from '@/views/LoginPage.vue';
import Notice from '@/views/Notice.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'LoginPage',
			props: { page: 0 },
			component: LoginPage,
		},
		{
			path: '/notice',
			name: 'Notice',
			component: Notice,
			props: { page: 1 },
			alias: '/',
			beforeEnter: AuthGuard,
		},
		{
			path: '/attendance',
			name: 'Attendance',
			component: Attendance,
			props: { page: 2 },
			beforeEnter: AuthGuard,
		},
		{
			path: '/404',
			name: 'BadGateway',
			props: { page: 50 },
			component: BadGateway,
		},
		{
			path: '*',
			props: { page: 50 },
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
					location.reload();
				}
			})
			.catch(e => console.error(e));
	} else {
		next('/login');
	}
}
