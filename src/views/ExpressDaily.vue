<template>
	<div class="pa-4" style="overflow: auto;">
		<v-layout>
			<v-flex xs2>
				<h1 class="text-cente">今日遞送</h1>
			</v-flex>
			<v-flex>
				<v-btn @click="$refs.inputUpload.click()" color="success">選擇檔案</v-btn>
				<input @change="preview" accept=".csv" id="csv_input" ref="inputUpload" type="file" v-show="false" />
			</v-flex>
		</v-layout>
		<ExpressDailyPreview :csvArray.sync="newData" @postSuccess="getExpress()" class="my-4" v-if="showPreview" />
		<!-- 選擇檔案後才顯示 -->
		<div class="datatable mt-5" v-if="showUploaded">
			<h2 class="text-center">已上傳派工</h2>
			<v-data-table
				:headers="headers"
				:items="uploadedData"
				:rows-per-page-items="[100]"
				class="elevation-1 text-xs-center"
			>
				<template v-slot:items="props">
					<td>{{ props.item.carrier }}</td>
					<td>{{ props.item.customer }}</td>
					<td>{{ props.item.payload }}</td>
				</template>
			</v-data-table>
		</div>
	</div>
</template>

<script>
import ExpressDailyPreview from '@/components/ExpressDailyPreview.vue';
import csv from 'csvtojson';
const reader = new FileReader();

export default {
	name: 'ExpressDaily',
	components: {
		ExpressDailyPreview,
	},
	data() {
		return {
			headers: [
				{
					text: '司機ID',
					sortable: false,
					align: 'center',
					value: 'carrier',
				},
				{
					text: '客戶電話',
					sortable: false,
					align: 'center',
					value: 'customer',
				},
				{
					text: '配送內容',
					sortable: false,
					align: 'center',
					value: 'payload',
				},
			],
			uploadedData: [],
			newData: [],
		};
	},
	computed: {
		showPreview() {
			if (this.newData.length !== 0) return true;
			return false;
		},
		showUploaded() {
			if (this.uploadedData.length !== 0) return true;
			return false;
		},
		pushDisabled() {
			if (this.newData.length === 0) return true;
			return false;
		},
	},
	watch: {
		newData() {
			if (this.newData.length) {
				this.$refs.inputUpload.value = '';
			}
		},
	},
	methods: {
		preview() {
			let f = this.$refs.inputUpload.files[0];

			reader.onload = async e => {
				let csvRow = await csv().fromString(e.target.result);
				this.newData.length = 0;
				this.newData.push(
					...csvRow.map(item => {
						const { carrier, customer, payload } = item;
						return { carrier, customer, payload, phone: customer };
					}),
				);
			};

			reader.readAsText(f);
		},
		submitExpress() {
			const url = API + '/express/';
			axios
				.post(url, this.newData.rows)
				.then(res => console.log(res))
				.catch(e => e);
		},
		getExpress() {
			axios.get(API + '/express/carrier').then(response => {
				this.uploadedData.length = 0;
				const trip = response.data.result[0].trip;
				this.uploadedData.push(...trip);
			});
		},
	},
	created() {
		this.getExpress();
	},
};
</script>

<style lang="scss"></style>
