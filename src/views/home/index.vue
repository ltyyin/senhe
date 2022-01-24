<template>
	<div class="home-container">
		<!-- navBar -->
		<van-nav-bar fixed safe-area-inset-top :border="false" placeholder>
			<template #left>
				<div class="logo">Logo</div>
			</template>

			<template #right>
				<div class="search-frame" @click="hello">
					<i class="shequ shequ-sousuo"></i>
					<span>探索知识海洋</span>
				</div>
			</template>
		</van-nav-bar>

		<!-- 导航栏 -->
		<!-- 
			标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容。
		 -->
		<van-tabs v-model="active" color="#1eddb2" swipeable>
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
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/channel.js'
import { mapMutations, mapState } from 'vuex'
import ChannelEdit from './components/channel-edit.vue'

export default {
	name: 'HomeIndex',
	data() {
		return {
			active: 0,
			isFetchChannel: true,
			channels: [],
			localChannels: [
				{ id: 'ckymfpjrz00392wvnox3csfq0', name: '推荐' },
				{ id: 'ckymifegx05362wvn34qd0cob', name: '赛事' },
				{ id: 'ckymig1wh05532wvnjmydu3zc', name: '活动' },
				{ id: 'ckymhdfeq02462wvntzpr1xkz', name: '师生' },
				{ id: 'ckymh8bnt01472wvnn5qbegpd', name: '思政' },
				{ id: 'ckymh7xbg01122wvnbgpp26ks', name: '运动' },
				{ id: 'ckymfscf200952wvngr2s3jis', name: '阅读' },
				{ id: 'ckymh8tno01822wvndrgr1af8', name: '跳蚤市场' },
			],
			isChannelEditShow: false,
			isEdit: false,
		}
	},
	computed: {
		...mapState('loginModel', ['userInfo', 'user']),
		...mapState('articleModel', ['isGetChannels']),
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

		hello() {
			console.log('探索知识的海洋')
		},
	},
	watch: {
		user: {
			immediate: true,
			async handler(newVal) {
				if (newVal) {
					const { data } = await getUserChannels(this.userInfo.userID)
					this.channels = data

					this.channels.unshift({
						id: 'ckymfpjrz00392wvnox3csfq0',
						name: '推荐',
					})
				} else {
					this.channels = this.localChannels
				}
			},
		},
	},
}
</script>

<style scoped lang="less">
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
				margin-left: 20px;
				font-size: 18px;
				color: #a1a8b1;
			}
		}
	}

	// /deep/ .van-tabs__nav {
	// background-color: #f9f9f9;
	// }

	/deep/ .van-tabs {
		.van-tab {
			color: #8a9098;
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
			color: #8a9098;
			font-size: 18px;
		}
		.wap-nav-placeholder {
			width: 30px;
			flex-shrink: 0;
		}
	}
}
</style>
