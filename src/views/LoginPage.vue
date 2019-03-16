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
								v-model="phoneNo"
							></v-text-field>
							<div class="text-xs-center" v-if="!loginBtnShow">
								<v-btn @click="sendOtp" color="primary" id="recaptcha-container">發送登入驗證碼</v-btn>
							</div>
							<div class="text-xs-center" v-if="loginBtnShow">
								<v-text-field
									id="password"
									label="驗證碼"
									name="password"
									prepend-icon="lock"
									type="text"
									v-model="otp"
								></v-text-field>
								<v-btn @click="verifyOtp" color="primary">輸入驗證碼登入系統</v-btn>
							</div>
						</v-form>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
// import firebaseui from 'firebaseui';
// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
export default {
	name: 'LoginPage',
	data() {
		return {
			phoneNo: '',
			appVerifier: '',
			otp: '',
			loginBtnShow: false,
		};
	},
	components: {},
	methods: {
		sendLoginInfo() {
			// console.log(this.userAccount, this.userPassword);
			// 驗證帳號密碼正確並回傳 Token 後執行：
			this.$store.dispatch('autoLogin', this.userPassword);
		},

		sendOtp() {
			let countryCode = '+886'; //india
			let phoneNumber = countryCode + this.phoneNo.substring(1);
			firebase
				.auth()
				.signInWithPhoneNumber(phoneNumber, this.appVerifier)
				.then(confirmationResult => {
					// SMS sent. Prompt user to type the code from the message, then sign the
					// user in with confirmationResult.confirm(code).
					window.confirmationResult = confirmationResult;
					this.loginBtnShow = true;
				})
				.catch(function(error) {
					// Error; SMS not sent
					// ...
					console.warn('Error ! SMS not sent');
					console.error(error);
				});
		},
		//
		verifyOtp() {
			if (this.otp.length != 6) {
				alert('Invalid Phone Number/OTP Format !');
			} else {
				// let code = this.otp;
				//
				window.confirmationResult
					.confirm(this.otp)
					.then(result => {
						let uid = result.user.uid;
						this.$store.dispatch('autoLogin', uid);
						this.$router.push('/attendance');
					})
					.catch(function(error) {
						firebase
							.auth()
							.signOut()
							.then(res => console.warn('帳號已登出'));
					});
			}
		},
		singOut() {
			firebase
				.auth()
				.signOut()
				.then(res => console.warn(res));
		},
		initReCaptcha() {
			setTimeout(() => {
				let vm = this;
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
					size: 'invisible',
					callback: function(response) {
						// reCAPTCHA solved, allow signInWithPhoneNumber.
						// ...
					},
					'expired-callback': function() {
						// Response expired. Ask user to solve reCAPTCHA again.
						// ...
					},
				});
				//
				this.appVerifier = window.recaptchaVerifier;
			}, 1000);
		},
	},
	created() {
		this.initReCaptcha();
	},
};
</script>

<style lang="scss" scoped>
.full_height {
	height: 100vh;
}
</style>
