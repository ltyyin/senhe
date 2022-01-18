<template>
	<div class="article-list">
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
					v-for="article in articles"
					:key="article.id"
					:article="article"
				/>
				<!-- <van-cell v-for="item in articles" :key="item.id" :title="item.title" /> -->
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
// import { ContactList } from 'vant'
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'

export default {
	name: 'ArticleList',
	components: {
		ArticleItem,
	},
	data() {
		return {
			articles: [],
			loading: false,
			finished: false,
			refreshing: false,
			timestamp: null,
			skip: 0,
		}
	},
	props: {
		channel: {
			type: Object,
			required: true,
		},
	},

	methods: {
		async onLoad() {
			const { data } = await getArticles({
				channel_id: this.channel.id,
				timestamp: Date.now(),
				orderBy: 'desc',
				skip: this.skip,
			})

			this.skip = data.skip
			this.articles.push(...data.results)
			this.loading = false

			if (data.results.length !== 15) {
				this.finished = true
			}
		},

		async onRefresh() {
			const { data } = await getArticles({
				channel_id: this.channel.id,
				timestamp: Date.now(),
				orderBy: 'asc',
				skip: this.skip,
			})

			this.skip = data.skip

			console.log(data)

			setTimeout(() => {
				this.articles.unshift(...data.results)
				/* 关闭刷新的状态 loading */
				this.refreshing = false
			}, 1000)
		},
	},
}
</script>

<style scoped lang="less">
.article-list {
	position: fixed;
	left: 0;
	right: 0;
	top: 90px;
	bottom: 50px;
	overflow-y: auto;
	background-color: #f2f1f6;
	.van-list {
		min-height: 80vh;
	}
}
</style>