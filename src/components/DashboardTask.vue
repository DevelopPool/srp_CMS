<template>
	<v-card class="pa-3 grey lighten-5">
		<i @click="$emit('update:taskList', [])" class="fa fa-2x fa-times close_icon"></i>
		<p class="mt-4 title">司機姓名：{{ carrierName }}</p>
		<p class="mt-3 title">司機電話：{{ carrierContact }}</p>
		<h2 class="py-3">訂單狀態</h2>
		<v-card>
			<v-layout v-for="(item, index) in taskList" :key="index" pa-3 column>
				<v-flex>{{ item.carrier }}</v-flex>
				<v-flex>{{ item.customer }}</v-flex>
				<v-flex>{{ item.payload }}</v-flex>
			</v-layout>
		</v-card>
	</v-card>
</template>

<script>
export default {
	name: 'DashboardTask',

	components: {},
	props: {
		taskList: Array,
		carrierName: String,
		carrierContact: String,
	},

	data() {
		return {};
	},

	computed: {},

	mounted() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
.close_icon {
	position: absolute;
	top: 1rem;
	right: 1rem;
}
</style>
