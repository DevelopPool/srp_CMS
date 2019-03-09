import Vue from 'vue';
import Router from 'vue-router';
import BadGateway from '@/views/BadGateway.vue';
import Dashboard from '@/views/Dashboard.vue';
import ExpressDaily from '@/views/ExpressDaily.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			props: { page: 1 },
			alias: '/',
		},
		{
			path: '/expressdaily',
			name: 'ExpressDaily',
			component: ExpressDaily,
			props: { page: 2 },
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
