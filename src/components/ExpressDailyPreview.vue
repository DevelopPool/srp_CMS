<template>
	<v-card>
		<v-card-title class="relative">
			<v-layout>
				<v-flex offset-xs4 text xs4>
					<h2 class="text-xs-center">上傳預覽</h2>
				</v-flex>
				<v-flex text-xs-right xs4>
					<v-btn @click="submitExpress" color="primary">上傳檔案</v-btn>
					<v-btn @click="$emit('update:csvArray', [])" color="info">取消</v-btn>
				</v-flex>
			</v-layout>
			<v-alert :value="!!errMsg" class="alert ma-0" transition="fade-transition" type="error">{{ errMsg }}</v-alert>
		</v-card-title>
		<v-layout column subheading text-xs-center>
			<v-flex blue-grey lighten-4 py-3>
				<v-layout>
					<v-flex xs2>司機ID</v-flex>
					<v-flex xs2>客戶電話</v-flex>
					<v-flex xs3>配送內容</v-flex>
					<v-flex xs5>地址</v-flex>
				</v-layout>
			</v-flex>
			<v-flex :key="index" py-3 v-for="(item, index) in csvArray">
				<v-layout align-center>
					<v-flex xs2>{{ item.carrier }}</v-flex>
					<v-flex xs2>{{ item.customer }}</v-flex>
					<v-flex xs3>{{ item.payload }}</v-flex>
					<v-flex xs5>
						<v-select
							:disabled="customerAddr(item.customer).length === 1"
							:items="customerAddr(item.customer)"
							:value="customerAddr(item.customer).length === 1 ? customerAddr(item.customer)[0] : ''"
							class="mx-3"
							ref="addr"
						></v-select>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
export default {
	name: 'ExpressDailyPreview',
	props: { csvArray: Array },
	data() {
		return {
			errMsg: '',
		};
	},
	methods: {
		customerAddr(customerPhone) {
			const matchData = this.$store.state.customerData.filter(item => {
				return item.contact.some(item => {
					return item.value === customerPhone;
				});
			})[0];
			return matchData.contact.filter(item => item.type === 'address').map(item => item.value);
		},
		submitExpress() {
			try {
				const url = API + '/express/';
				const fullData = this.csvArray.map((item, index) => {
					const { carrier, payload, phone } = item;
					const customer = this.$store.state.phoneIdChart[phone];
					const addr = this.$refs.addr[index].internalValue;
					if (!addr) {
						throw '請選擇正確的配送地址';
					}
					return {
						customer,
						carrier,
						payload,
						phone,
						addr,
						within: [{ since: 930, till: 1530 }, { since: 1700, till: 2100 }],
					};
				});
				const postFullData = {
					date: Number(
						new Date()
							.toISOString()
							.substr(0, 10)
							.replace(/-/g, ''),
					),
					trips: fullData,
				};
				axios
					.post(url, postFullData)
					.then(res => {
						this.$emit('postSuccess');
						this.$emit('update:csvArray', []);
					})
					.catch(e => console.warn('錯誤囉：' + e));
			} catch (e) {
				this.errMsg = e;
			}
		},
	},
	watch: {
		errMsg() {
			setTimeout(() => {
				this.errMsg = '';
			}, 3000);
		},
	},
};
</script>

<style lang="scss" scoped>
.alert {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}
.relative {
	position: relative;
}
</style>
