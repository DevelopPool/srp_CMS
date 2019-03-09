<template>
	<v-layout>
		<ChatList style="flex: 2" />
		<ChatMsg style="flex: 3" />
	</v-layout>
</template>

<script>
import ChatList from '@/components/ChatList.vue';
import ChatMsg from '@/components/ChatMsg.vue';
export default {
	name: 'Chat',
	components: {
		ChatList,
		ChatMsg,
	},
};
</script>

<style lang="scss" scoped></style>
