import Vue from 'vue';
import Router from 'vue-router';
import BadGateway from '@/views/BadGateway.vue';
import ExpressDaily from '@/views/Attendance.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/attendance',
			name: 'Attendance',
			component: ExpressDaily,
			props: { page: 1 },
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
