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
							<v-btn @click="sendOtp" color="primary">Send Otp</v-btn>
							<div id="recaptcha-container"></div>
							<v-text-field
								id="password"
								label="驗證碼"
								name="password"
								prepend-icon="lock"
								type="text"
								v-model="otp"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="verifyOtp" color="primary">Login</v-btn>
						<v-btn @click="singOut">登出</v-btn>
					</v-card-actions>
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
			userAccount: '',
			userPassword: '',
			phoneNo: '',
			appVerifier: '',
			otp: '',
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
			console.log(phoneNumber);
			firebase
				.auth()
				.signInWithPhoneNumber(phoneNumber, this.appVerifier)
				.then(function(confirmationResult) {
					// SMS sent. Prompt user to type the code from the message, then sign the
					// user in with confirmationResult.confirm(code).
					window.confirmationResult = confirmationResult;
					//
					alert('SMS sent');
				})
				.catch(function(error) {
					// Error; SMS not sent
					// ...
					alert('Error ! SMS not sent');
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
						localStorage.setItem('uid', uid);
						this.$store.dispatch('autoLogin', uid);
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
