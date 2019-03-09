<template>
	<v-card class="d-flex layout column">
		<v-toolbar color="teal" dark style="flex: 0 0 auto !important">
			<v-toolbar-title class="text-xs-center flex xs12">BlueT</v-toolbar-title>
		</v-toolbar>
		<v-container :style="{ height: containerChatHeight }" class="container--chat" fluid ref="containerChat">
			<div
				:class="{ 'text-xs-right': message.owner === 'me' }"
				:key="`message${index}`"
				v-for="(message, index) in messages"
			>
				<span :class="['bubble--message', message.owner === 'me' ? 'bubble--own' : 'bubble--customer']">
					{{ message.content }}
				</span>
			</div>
		</v-container>
		<v-container fluid>
			<v-layout row wrap>
				<v-flex xs12>
					<v-textarea
						hide-details
						outline
						class="layout align-center"
						@click:append-outer="sendMessage"
						@keyup.enter="sendMessage"
						append-outer-icon="send"
						v-model="typer"
					></v-textarea>
				</v-flex>
			</v-layout>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: 'ChatMsg',
	data() {
		return {
			typer: '',
			containerChatHeight: '',
			messages: [],
		};
	},
	mounted() {
		this.setChatHeight();
		// Test data
		this.messages = [
			{ owner: 'me', content: '哈囉您好' },
			{ owner: 'me', content: '有人在嗎？' },
			{ owner: 'customer', content: '嗨嗨您好' },
			{ owner: 'me', content: '約半小時後到您那裡' },
			{ owner: 'me', content: '請問有人可以簽收嗎？' },
			{ owner: 'customer', content: '可以一個小時後再來嗎？' },
			{ owner: 'me', content: '好的一個小時後過去。' },
			{ owner: 'me', content: '再與您聯絡' },
			{ owner: 'customer', content: '謝謝' },
		];
		this.chatScrollToEnd();
	},
	methods: {
		callOut() {
			document.getElementById('link-phone').click();
		},
		sendMessage() {
			const send = {
				owner: 'me',
				content: this.typer,
			};
			this.messages.push(send);
			this.typer = '';
			this.chatScrollToEnd();
		},
		setChatHeight() {
			const orderInfoHeight = 0;
			this.containerChatHeight = 'calc(100vh - 119px - ' + orderInfoHeight + 'px)';
		},
		chatScrollToEnd() {
			setTimeout(() => {
				let containerChat = this.$refs.containerChat;
				containerChat.scrollTop = containerChat.scrollHeight;
			}, 10);
		},
	},
};
</script>

<style scoped>
.container--order-info {
	background-color: white;
	border-bottom: 1px solid #eeeeee;
}
.text--grey-darken-3 {
	color: #424242;
}
.row--info-title {
	margin-bottom: 4px;
}
.row--info-content + .row--info-title {
	margin-top: 8px;
}
.icon--phone {
	font-size: 20px;
	margin-left: 4px;
	color: #00c853;
}
.link--not-show {
	display: none;
}
.container--chat {
	overflow-y: scroll;
	background-color: #f5f5f5;
}
.bubble--message {
	padding: 8px;
	border-radius: 10px;
	display: inline-block;
	max-width: 50%;
	word-wrap: break-word;
	margin-bottom: 3px;
}
.bubble--own {
	background-color: #009688;
	color: white;
	text-align: left;
}
.bubble--customer {
	background-color: #0d47a1;
	color: white;
}
</style>
