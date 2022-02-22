<template>
	<div class="users-result-container">
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
				<div class="user-show" v-for="user in results" :key="user.id">
					<van-image
						width="40"
						height="40"
						:src="user.photo"
						round
						fit="cover"
					/>
					<div class="name" v-html="highLight(user.name)"></div>
					<button><span>+</span>关注</button>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import { findUsers } from '@/api/search.js'
import { mapState } from 'vuex'

export default {
	name: 'UsersResult',

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
		highLight(userName) {
			return userName.replace(
				new RegExp(this.searchText, 'ig'),
				`<span style="color:red;">${this.searchText}</span>`
			)
		},

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
			const { data } = await findUsers({ keyWords: this.searchText })
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
div.users-result-container {
	.van-pull-refresh {
		overflow: initial;
		.van-list {
			height: 79vh;

			.user-show {
				height: 55px;
				padding: 0 5px;
				margin-top: 5px;
				background-color: #fefefe;
				display: flex;
				justify-content: start;
				align-items: center;
				.van-image {
					margin: 0 10px;
				}
				.name {
					margin-right: auto;
					font-size: 18px;
				}

				button {
					margin-right: 8px;
					border: unset;
					font-size: 13px;
					color: @theme-color;
					font-weight: 500;
					padding: 5px 6px;
					border-radius: 20px;
					background-color: #eff1f4;
					span {
						padding: 0 2px 0 3px;
					}
				}
			}
		}
	}
}
</style>