<template>
	<div class="home-container">
		<!-- navBar -->
		<van-nav-bar fixed safe-area-inset-top :border="false" placeholder>
			<template #left @click="iconJump">
				<div class="logo"></div>
				<span class="logo-text">学生知识共享</span>
			</template>

			<template #right>
				<div class="search-frame" @click="$router.push({ name: 'search' })">
					<i class="shequ shequ-sousuo"></i>
					<span>探索知识海洋</span>
				</div>
			</template>
		</van-nav-bar>

		<!-- 导航栏 -->
		<!-- 
			标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容。
			animated
		 -->
		<van-tabs v-model="active" color="#1eddb2" swipeable>
			<!-- 固定一个推荐频道在程序中 -->
			<van-tab :title="recommendChannel.name" v-if="channels.length !== 0">
				<ArticleList :channel="recommendChannel" />
			</van-tab>

			<van-tab
				v-for="(channel, index) in channels"
				:title="channel.name"
				:key="index + '-' + channel.id"
			>
				<ArticleList :channel="channel"></ArticleList>
			</van-tab>

			<template #nav-right>
				<div class="wap-nav-wrap" @click="isChannelEditShow = true">
					<van-icon name="wap-nav" />
				</div>
				<!-- 汉堡按钮占位符 -->
				<div class="wap-nav-placeholder"></div>
			</template>
		</van-tabs>

		<!-- 编辑频道popup -->
		<van-popup
			class="channel-edit-popup"
			v-model="isChannelEditShow"
			position="bottom"
			closeable
			close-icon-position="top-left"
			:style="{ height: '100%' }"
			get-container="body"
			@closed="closeEdit"
		>
			<ChannelEdit
				:channels="channels"
				:active="active"
				:isEdit="isEdit"
				@close="isChannelEditShow = false"
				@update-active="active = $event"
				@switch-is-edit="isEdit = $event"
			></ChannelEdit>
		</van-popup>
	</div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'
import { getUserChannels } from '@/api/channel.js'
import { mapMutations, mapState } from 'vuex'
import ChannelEdit from './components/ChannelEdit.vue'
// 引入本地的频道数据
import { LocalChannelsData, recommendChannel } from './localData/channels'

export default {
	name: 'HomeIndex',
	data() {
		return {
			active: 0,
			isFetchChannel: true,
			channels: [],
			localChannels: LocalChannelsData(),
			isChannelEditShow: false,
			isEdit: false,
		}
	},
	computed: {
		...mapState('loginModel', ['user']),
		...mapState('articleModel', ['isGetChannels']),

		recommendChannel() {
			return recommendChannel()
		},
	},
	components: {
		ArticleList,
		ChannelEdit,
	},
	methods: {
		...mapMutations('articleModel', ['setGetChannels']),

		closeEdit() {
			if (this.isEdit) {
				this.isEdit = false
			}
		},

		iconJump() {
			console.log('hi')
		},
	},
	watch: {
		user: {
			immediate: true,
			async handler(val) {
				if (val) {
					const { data } = await getUserChannels()
					this.channels = data
				} else {
					this.channels = this.localChannels
				}
			},
		},
	},
}
</script>

<style scoped lang="less">
@tab-bar-color: #8a9098;

.home-container {
	background-color: #f2f1f6;
	/deep/ .van-nav-bar {
		// background-color: #f9f9f9;
		.search-frame {
			background-color: #eff1f4;
			color: #858f9b;
			height: 30px;
			border-radius: 3px;
			width: 170px;
			text-align: left;
			padding-left: 10px;
			display: flex;

			i {
				align-self: center;
			}

			span {
				padding-left: 5px;
				vertical-align: middle;
				color: #a1a8b1;
				align-self: center;
			}
		}

		.van-nav-bar__left {
			.logo {
				width: 30px;
				height: 30px;
				background: url('../../assets/logo/logo.png') no-repeat;
				background-size: cover;
				margin: 0 10px;
			}

			.logo-text {
				color: rgb(124, 124, 124);
				font-size: 15px;
			}
		}

		.van-nav-bar__right {
			&:active {
				opacity: initial;
			}
		}
	}

	/deep/ .van-tabs {
		.van-tab {
			color: @tab-bar-color;
		}

		.van-tabs__wrap {
			border-bottom: 2px solid #eeedf1;
		}

		.van-tab--active {
			color: rgb(30, 221, 178);
		}

		.wap-nav-wrap {
			line-height: 44px;
			position: fixed;
			right: 0;
			background-color: #fff;
			padding: 0 10px;
			z-index: 1;
			color: @tab-bar-color;
			font-size: 18px;
		}
		.wap-nav-placeholder {
			width: 30px;
			flex-shrink: 0;
		}
	}
}
</style>
