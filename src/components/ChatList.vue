<template>
	<v-card class="d-flex layout column">
		<v-toolbar style="flex: 0 0 auto !important" color="teal" dark>
			<v-toolbar-title class="text-xs-center flex xs12">聯絡人</v-toolbar-title>
		</v-toolbar>
		<v-list subheader style="overflow: auto">
			<v-list-tile :key="index" avatar v-for="(item, index) in customerList">
				<v-list-tile-avatar>
					<img :src="item.avatar" />
				</v-list-tile-avatar>

				<v-list-tile-content>
					<v-list-tile-title v-html="item.name"></v-list-tile-title>
					<v-list-tile-sub-title v-html="item.receivingTime"></v-list-tile-sub-title>
				</v-list-tile-content>

				<v-list-tile-action>
					<v-badge color="purple" left v-model="item.count">
						<span slot="badge">{{ item.count }}</span>
					</v-badge>
				</v-list-tile-action>
			</v-list-tile>
		</v-list>
	</v-card>
</template>

<script>
export default {
	name: 'ChatList',
	components: {},
	data() {
		return {
			customerList: [
				{
					name: 'BlueT',
					count: 1,
					receivingTime: '2019/01/29 00:47',
					avatar:
						'https://scontent.ftpe7-1.fna.fbcdn.net/v/t1.0-9/46507241_524083811436005_4935154204651028480_n.png?_nc_cat=106&_nc_ht=scontent.ftpe7-1.fna&oh=df9b3cc33ad058f5a5642277ee007d7c&oe=5D2633AD',
				},
			],
		};
	},
};
</script>

<style lang="sass" scoped></style>
