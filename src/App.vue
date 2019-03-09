<template>
	<v-app overflow-hidden>
		<component :is="componentName" class="overflow-hidden"></component>
	</v-app>
</template>

<script>
import MainPage from './views/MainPage';
import LoginPage from './views/LoginPage';

export default {
	name: 'Admin',
	components: { MainPage, LoginPage },
	data() {
		return {
			// componentName: 'LoginPage',
		};
	},
	computed: {
		componentName() {
			return this.$store.state.loginStatus ? 'MainPage' : 'LoginPage';
		},
	},
	created() {
		if (localStorage.getItem('user_token')) {
			this.$store.dispatch('autoLogin', localStorage.getItem('user_token'));
		}
	},
};
</script>

<style lang="scss">
body::-webkit-scrollbar {
	display: none;
}
</style>
