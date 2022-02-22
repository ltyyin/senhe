<template>
	<div class="article-search-container">
		<!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
		<!-- 搜索框 -->
		<form action="/">
			<van-search
				v-model="keyWords"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch"
				@cancel="$router.back()"
				autofocus
				@focus="isResultShow = false"
				maxlength="30"
			/>
		</form>
		<!-- 搜索框 -->

		<!-- 顶部导航标签组件 -->
		<top-bar :isResultShow="isResultShow"></top-bar>
		<!-- 顶部导航标签组件 -->

		<!-- 搜索历史组件 -->
		<search-history
			v-if="!isResultShow"
			:search-histories="searchHistories"
			@deleteHistoryItem="deleteHistoryItem"
			@deleteHistoryAll="deleteHistoryAll"
			@shortcutSearch="shortcutSearch"
		></search-history>
		<!-- 搜索历史组件 -->
	</div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import SearchHistory from './components/SearchHistory.vue'
import { mapMutations, mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
import { removeItem } from '../../utils/storage'
import {
	fetchUserSearchHis,
	delUserSearchHisItem,
	userSearchHisStorage,
	delUserSearchHisAll,
} from '@/api/search'

export default {
	name: 'SearchIndex',
	components: { TopBar, SearchHistory },
	computed: {
		...mapState('searchModel', ['searchText']),
		...mapState('loginModel', ['user']),
	},
	data() {
		return {
			keyWords: '', // 搜索输入框中的内容
			isResultShow: false, // 显示搜索结果展示的状态
			searchHistories: [], // 所有的搜索历史记录数据
		}
	},
	watch: {
		user: {
			immediate: true,
			async handler(val) {
				if (val) {
					try {
						const { data } = await fetchUserSearchHis()
						this.searchHistories = data.map((item) => {
							return item.content
						})
						return
					} catch (err) {
						return
					}
				}

				this.searchHistories = getItem('search-histories') || []
			},
		},
	},
	methods: {
		...mapMutations('searchModel', ['searchTextMu']),

		delRepeat(val) {
			const index = this.searchHistories.indexOf(val)
			if (index !== -1) {
				this.searchHistories.splice(index, 1)
			}
		},

		/* enter搜索的处理函数*/
		async onSearch(val) {
			this.delRepeat(val)

			if (val !== '') this.searchHistories.unshift(val)
			if (this.searchHistories.length > 12) this.searchHistories.pop()

			this.searchTextMu(val)
			this.isResultShow = true

			if (this.user) {
				// 这里是当用户有登录的时候应该存放到后端的数据记录
				userSearchHisStorage({ content: val }).catch((err) => {})
			} else {
				setItem('search-histories', this.searchHistories)
			}
		},

		/* 历史快捷搜索自定义事件*/
		shortcutSearch(str) {
			this.keyWords = this.searchText
			this.isResultShow = true

			this.delRepeat(str)
			this.searchHistories.unshift(str)
			userSearchHisStorage({ content: str }).catch((err) => {})
		},

		/* 删除指定的历史记录处理函数*/
		deleteHistoryItem(str) {
			this.delRepeat(str)

			if (this.user) {
				delUserSearchHisItem(str).catch((err) => {})
			} else {
				setItem('search-histories', this.searchHistories)
			}
		},

		/* 删除所有的搜索记录*/
		async deleteHistoryAll() {
			if (this.user) {
				this.searchHistories.splice(0)
				delUserSearchHisAll().catch((err) => {})
				return
			}
			this.searchHistories.splice(0)
			removeItem('search-histories')
		},
	},
}
</script>

<style lang="less">
div.article-search-container {
	div.van-search {
		.van-search__content {
			border-radius: 5px;
			.van-field__left-icon {
				margin: 0 5px;
				color: #8d9098;
			}
		}

		.van-search__action {
			padding: 0 15px;
			color: @theme-color;
			font-weight: 600;
			&:active {
				background-color: initial;
			}
		}
	}
}
</style>