<template>
	<div style="position: relative;">
		<GmapMap :center="center" :zoom="15" class="fill-height" map-type-id="terrain" style="width: 100%;">
			<gmapInfoWindow
				:opened="infoWindowOpen"
				:options="infoOptions"
				:position="infoWindowPosition"
				@closeclick="infoWindowOpen = false"
				style="position: relative;"
			>
				<div class="pa-3 pb-5 my-0 mx-auto mark_text">
					<p>司機 ID： {{ carrierInfo.id }}</p>
					<p>司機姓名： {{ carrierInfo.name }}</p>
					<p>司機電話： {{ carrierInfo.contact }}</p>
					<p>目前配送客戶： 練喆明</p>
					<v-btn @click="showTask(carrierInfo.id)" class="mx-auto info_btn">查看詳情</v-btn>
				</div>
			</gmapInfoWindow>
			<GmapMarker
				:clickable="true"
				:key="index"
				:position="m.position"
				@click="toggleInfoWindow(m, index)"
				v-for="(m, index) in markers"
			></GmapMarker>
		</GmapMap>
		<DashboardTask
			:carrierContact="carrierInfo.contact"
			:carrierName="carrierInfo.name"
			:taskList.sync="carrierTask"
			class="carrier_task m-0 p-3"
			style="z-index: 100"
			v-if="carrierTask.length > 0"
		/>
		<div class="search-input pa-2 teal" style="z-index: 110">
			<DashboardSearch
				:carrierData="markers"
				:selectedCarrier.sync="selectedCarrier"
				@searchComplete="searchComplete"
			/>
		</div>
	</div>
</template>

<script>
import DashboardTask from '@/components/DashboardTask.vue';
import DashboardSearch from '@/components/DashboardSearch.vue';

export default {
	name: 'Dashboard',
	components: {
		DashboardTask,
		DashboardSearch,
	},
	data() {
		return {
			selectedCarrier: '',
			center: { lat: 24.147964, lng: 120.673506 },
			markers: [],
			infoWindowPosition: null,
			infoWindowOpen: false,
			currentIndex: null,
			//optional: offset infowindow so it visually sits nicely on top of our marker
			infoOptions: {
				pixelOffset: {
					width: 0,
					height: -35,
				},
			},
			carrierTask: [],
			carrierInfo: {
				id: '',
				name: '',
				contact: '',
			},
		};
	},
	methods: {
		toggleInfoWindow(marker, index) {
			this.center = marker.position;
			this.infoWindowPosition = marker.position;
			//check if its the same marker that was selected if yes toggle
			if (this.currentIndex === index) {
				this.infoWindowOpen = !this.infoWindowOpen;
			} else {
				axios.get(API + `/carrier/${marker.title}/`).then(res => {
					this.carrierInfo.id = res.data.result.id;
					this.carrierInfo.name = res.data.result.name;
					this.carrierInfo.contact = res.data.result.contact[0].data;
				});
				this.infoWindowOpen = true;
				this.currentIndex = index;
			}
		},
		showTask(carrierId) {
			axios.get(API + `/express/carrier/${carrierId}/`).then(res => {
				res.data.result[0].trip.forEach((item, index) => {
					this.$set(this.carrierTask, index, item);
				});
			});
		},
		searchComplete() {
			console.log('searchComplete');
			this.markers.some((item, index) => {
				if (item.title === this.selectedCarrier) {
					this.toggleInfoWindow(this.markers[index], index);
					return true;
				}
			});
		},
	},
	watch: {
		selectedCarrier() {
			this.searchComplete();
		},
	},
	created() {
		axios
			.get(API + '/track/')
			.then(res => {
				res.data.result.forEach(item => {
					this.markers.length = 0;
					this.markers.push({
						position: { lat: item.loc.lat, lng: item.loc.lon },
						title: 'staff0001',
						infoText: '',
					});
				});
			})
			.catch(e => e);
	},
};
</script>

<style lang="scss" scoped>
.mark_text {
	font-size: 1rem;
	font-weight: bold;
}
.carrier_task {
	position: absolute;
	top: 5rem;
	bottom: 0;
	right: 0;
	min-width: 330px;
	max-width: 50%;
	background-color: antiquewhite;
}
.info_btn {
	width: 75%;
	margin: 0;
	position: absolute;
	bottom: 3%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.search-input {
	position: absolute;
	top: 10px;
	right: 60px;
	border-radius: 40px;
}
</style>
