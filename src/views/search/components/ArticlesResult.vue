<template>
	<div class="article-result-container">
		<van-pull-refresh
			v-model="refreshing"
			@refresh="onRefresh"
			success-text="刷新成功"
			animation-duration="1500"
		>
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<ArticleItem
					v-for="article in results"
					:key="article.id"
					:article="article"
					is-high-light
				/>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { findArticles } from '@/api/search.js'
import { mapState } from 'vuex'
export default {
	name: 'ArticleResult',
	components: { ArticleItem },
	data() {
		return {
			results: [], // 搜索文章返回的结果
			loading: false, // 加载状态
			finished: false, // 加载完成状态
			refreshing: false, // 刷新加载状态
		}
	},
	computed: mapState('searchModel', ['searchText']),
	methods: {
		/* 数据加载处理函数*/
		async onLoad() {
			if (!this.searchText) {
				// 关闭加载状态
				this.loading = false
				// 关闭加载更多
				this.finished = true
				return
			}

			// 向后台获取与关键词有关的数据
			const { data } = await findArticles({ keyWords: this.searchText })
			// 把获取到的数据添加到results数组中进行前端展示
			this.results.push(...data)

			if (data.length <= 0) {
			}

			// 关闭加载状态
			this.loading = false
			// 关闭加载更多
			this.finished = true
		},

		/* 刷新加载处理函数*/
		onRefresh() {
			setTimeout(() => {
				/* 关闭刷新的状态 loading */
				this.refreshing = false
			}, 1500)
		},
	},
}
</script>

<style lang="less">
.article-result-container {
	.van-pull-refresh {
		overflow: initial;
		.van-list {
			height: 79vh;
		}
	}
}
</style>