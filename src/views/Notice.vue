<template>
	<div>
		<div>
			<v-card color="blue-grey lighten-4">
				<v-card-title primary-title>
					<div style="width: 100%">
						<h2 class="headline mb-3 text-xs-center">發布公告</h2>
						<v-text-field label="公告標題" v-model="title"></v-text-field>
						<v-textarea solo name="input-7-4" label="公告內容" v-model="detail"></v-textarea>
					</div>
				</v-card-title>
				<v-card-actions style="justify-content: center" class="pb-4">
					<v-btn @click="submit">送出</v-btn>
				</v-card-actions>
			</v-card>
		</div>
		<h2 class="text-xs-center ma-4">本月公告</h2>
		<v-layout wrap>
			<v-flex xs12 v-if="noticeArray.length === 0">
				<v-card color="blue-grey darken-2" class="white--text">
					<v-card-title primary-title>
						<div style="width: 100%">
							<div class="headline mb-4">本日尚無公告</div>
							<div class="text-xs-right">
								{{
									new Date()
										.toISOString()
										.replace('T', ' ')
										.split('.')[0]
								}}
							</div>
						</div>
					</v-card-title>
				</v-card>
			</v-flex>
			<v-flex xs12 md6 pa-2 v-for="(item, index) in noticeArray" :key="index">
				<v-card color="blue-grey darken-2" class="white--text">
					<v-card-title primary-title>
						<div style="width: 100%">
							<div class="headline mb-0">{{ item.title }}</div>
							<p class="mb-2">{{ item.issuer }}</p>
							<p class="mb-2">{{ item.detail }}</p>
							<div class="text-xs-right">{{ item.issueTime }}</div>
						</div>
					</v-card-title>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
export default {
	name: 'Notice',
	data() {
		return {
			noticeArray: [],
			title: '',
			detail: '',
		};
	},
	methods: {
		getAnnouncement() {
			const url = API + '/getAnnouncement';
			let data = { uid: this.$store.state.uid };
			axios.post(url, data).then(res => {
				const announcement = res.data.announcement.map(item => {
					return {
						issueTime: new Date(item.issueTime._seconds * 1000)
							.toISOString()
							.replace('T', ' ')
							.split('.')[0],
						title: item.title,
						detail: item.detail,
						issuer: item.issuer,
					};
				});

				this.noticeArray.length = 0;
				this.noticeArray.push(...announcement);
			});
		},
		submit() {
			const url = API + '/addAnnouncement';
			const data = { uid: this.$store.state.uid, title: this.title, detail: this.detail };
			axios
				.post(url, data)
				.then(this.getAnnouncement)
				.then((this.title = ''), (this.detail = ''));
		},
	},
	created() {
		this.getAnnouncement();
	},
};
</script>