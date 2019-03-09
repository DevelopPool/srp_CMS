<template>
	<v-layout column style="height:100vh">
		<v-toolbar color="grey darken-1" dark>
			<!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
			<v-toolbar-title>門口送豆漿</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="d-flex flex xs7">
				<v-btn @click.native="activeItem = 1" append flat to="/dashboard">最新動態</v-btn>
				<v-btn @click.native="activeItem = 2" append flat to="/expressdaily">任務派遣</v-btn>
				<v-btn @click.native="activeItem = 3" append flat to="/customer">客戶資料</v-btn>
				<v-btn @click.native="activeItem = 4" append flat to="/carrier">駕駛資料</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-flex d-flex>
			<Chat class="flex xs5"></Chat>
			<router-view></router-view>
		</v-flex>
		<v-footer dark height="auto">
			<v-card class="flex" flat tile>
				<v-card-actions class="grey darken-3 justify-center">
					<span>&copy; {{ new Date().getFullYear() }} Copyright: deliwater</span>
				</v-card-actions>
			</v-card>
		</v-footer>
	</v-layout>
</template>

<script>
import Chat from '@/components/Chat.vue';

export default {
	name: 'AdminTemplate',
	components: { Chat },
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
