<template>
	<v-layout column style="height:100vh">
		<v-toolbar color="grey darken-1" dark>
			<!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
			<v-toolbar-title>司馬庫斯管理系統</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="d-flex flex xs7">
				<v-btn @click.native="activeItem = 2" append flat to="/bulletin">公告系統</v-btn>
				<v-btn @click.native="activeItem = 2" append flat to="/attendance">出勤紀錄</v-btn>
				<v-btn @click.native="activeItem = 3" append flat to="/personnel">人員資料</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-container>
			<router-view></router-view>
		</v-container>
		<v-footer dark height="auto">
			<v-card class="flex" flat tile>
				<v-card-actions class="grey darken-3 justify-center">
					<span>&copy; {{ new Date().getFullYear() }} Copyright: 司馬庫斯管理系統</span>
				</v-card-actions>
			</v-card>
		</v-footer>
	</v-layout>
</template>

<script>
// import Chat from '@/components/Chat.vue';

export default {
	name: 'AdminTemplate',
	// components: { Chat },
	data() {
		return {
			activeItem: 1,
		};
	},
	beforeMount() {
		this.activeItem = this.$route.matched[0].props.default.page;
	},
	created() {
		axios.get(API + '/customer/').then(response => {
			this.$store.dispatch('asyncCustomerData', response.data.result);
		});
	},
};
</script>
