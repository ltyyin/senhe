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
				v-for="channel in channels"
				:title="channel.name"
				:key="channel.id"
			>
				<ArticleList :channel="channel"></ArticleList>
			</van-tab>

			<template #nav-right>
				<div class="wap-nav-wrap">
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
		/>
	</div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/user.js'
import { mapMutations, mapState } from 'vuex'

export default {
	name: 'HomeIndex',
	data() {
		return {
			active: 0,
			isFetchChannel: true,
			channels: [],
			localChannels: [
				{ id: '1', name: '推荐' },
				{ id: '2', name: '热门' },
				{ id: '3', name: '药品' },
				{ id: '4', name: '汽修' },
				{ id: '5', name: '公共课部' },
				{ id: '6', name: '艺术设计' },
				{ id: '7', name: '机电' },
				{ id: '8', name: '课程' },
				{ id: '9', name: '阅读' },
			],
			isChannelEditShow: false,
		}
	},
	computed: {
		...mapState('loginModel', ['userInfo', 'user']),
		...mapState('articleModel', ['isGetChannels']),
	},
	components: {
		ArticleList,
	},
	methods: {
		...mapMutations('articleModel', ['setGetChannels']),

		hello() {
			console.log(this.userInfo.userID)
		},
	},
	watch: {
		user: {
			immediate: true,
			async handler(newVal) {
				if (newVal) {
					const { data } = await getUserChannels(this.userInfo.userID)
					this.channels = data
					this.channels.unshift(
						{ id: '1', name: '推荐' },
						{ id: '2', name: '热门' }
					)
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
