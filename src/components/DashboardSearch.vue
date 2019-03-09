<template>
	<v-autocomplete
		:items="states"
		v-model="model"
		no-data-text="查無資料"
		placeholder="輸入司機編號進行搜尋"
		prepend-icon="search"
		class="pa-0 ma-0 mr-2"
		dark
		hide-details
		@keyup.enter="$emit('searchComplete')"
	>
		<!-- <v-slide-x-reverse-transition mode="out-in" slot="append-outer"></v-slide-x-reverse-transition> -->
	</v-autocomplete>
</template>

<script>
export default {
	name: 'DashboardSearch',
	props: {
		selectedCarrier: String,
		carrierData: Array,
	},
	data() {
		return {
			model: this.selectedCarrier,
		};
	},
	computed: {
		states() {
			return this.carrierData.map(item => item.title);
		},
	},
	watch: {
		model() {
			this.$emit('update:selectedCarrier', this.model);
		}
	},
};
</script>