<template>
	<v-container fill-height fluid>
		<v-layout align-center justify-center>
			<v-flex md4 sm8 xs12>
				<v-card class="elevation-12">
					<v-toolbar color="primary" dark>
						<v-toolbar-title class="ma-auto">司馬庫斯管理系統</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form>
							<v-text-field
								label="帳號"
								name="login"
								prepend-icon="person"
								type="text"
								v-model="userAccount"
							></v-text-field>
							<v-text-field
								id="password"
								label="密碼"
								name="password"
								prepend-icon="lock"
								type="password"
								v-model="userPassword"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="sendLoginInfo" color="primary">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'LoginPage',
	data() {
		return {
			userAccount: '',
			userPassword: '',
		};
	},
	components: {},
	methods: {
		sendLoginInfo() {
			// console.log(this.userAccount, this.userPassword);
			// 驗證帳號密碼正確並回傳 Token 後執行：
			this.$store.dispatch('autoLogin', this.userPassword);
		},
	},
};
</script>

<style lang="scss" scoped>
.full_height {
	height: 100vh;
}
</style>
