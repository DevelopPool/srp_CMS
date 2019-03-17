<template>
	<v-container fill-height fluid>
		<v-layout align-center justify-center>
			<v-flex md4 sm8 xs12>
				<v-card class="elevation-12">
					<v-toolbar color="primary" dark>
						<v-toolbar-title class="ma-auto">司馬庫斯管理系統</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form @submit.native.prevent>
							<v-text-field
								label="電話驗證"
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
				window.confirmationResult
					.confirm(this.otp)
					.then(result => {
						let uid = result.user.uid;
						this.$store.commit('userLogin', uid);
						console.log('store.uid: ', this.$store.state.uid);
						return uid;
						// this.$router.push('/notice');
					})
					.then(uid => {
						const url = API + '/checkLogin';
						const postBody = { uid };
						return axios.post(url, postBody);
					})
					.then(res => {
						if (res.data.excutionResult === 'success') {
							this.$router.push('/');
						} else {
							location.reload();
						}
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
			if (this.$store.state.uid) {
				const url = API + '/getUserDetail';
				const postBody = { uid: this.$store.state.uid };
				axios
					.post(url, postBody)
					.then(res => {
						if (res.data.excutionResult === 'success') {
							this.$router.push('/');
						} else {
							this.$store.commit('userLogin', '');
						}
					})
					.catch(e => console.error(e));
			}
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
